<script>
	import { registerPlugin, supported } from 'svelte-filepond';
	import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
	registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
	import axios from 'axios';
	import { onMount, onDestroy } from 'svelte';
	import * as FilePond from 'filepond';

	var inputElement;
	var pond;

	onMount(() => {
		//     const response = await axios.get('https://app.homerate.pl/public/uploads/database.json');
		//         source: `https://app.homerate.pl/public/uploads/images/${file.name}`,

		let tempa = {
			server: {
				url: 'https://app.homerate.pl/public/uploads/',
				process: {
					url: 'process.php',
					method: 'POST',
					headers: {
						'x-customheader': 'Processing File'
					},
					onload: (response) => {
						console.log('raw', response);
						response = JSON.parse(response);
						console.log(response);
						return response.key;
					},
					onerror: (response) => {
						console.log('raw', response);
						response = JSON.parse(response);
						console.log(response);
						return response.msg;
					},
					ondata: (formData) => {
						window.h = formData;
						console.log(formData);
						return formData;
					}
				},
				revert: (uniqueFileId, load, error) => {
					const formData = new FormData();
					formData.append('key', uniqueFileId);

					console.log(uniqueFileId);

					fetch(`revert.php?key=${uniqueFileId}`, {
						method: 'DELETE',
						body: formData
					})
						.then((res) => res.json())
						.then((json) => {
							console.log(json);
							if (json.status == 'success') {
								// Should call the load method when done, no parameters required
								load();
							} else {
								// Can call the error method if something is wrong, should exit after
								error(err.msg);
							}
						})
						.catch((err) => {
							console.log(err);
							// Can call the error method if something is wrong, should exit after
							error(err.message);
						});
				},
				remove: (uniqueFileId, load, error) => {
					const formData = new FormData();
					formData.append('key', uniqueFileId);

					console.log(uniqueFileId);

					fetch(`revert.php?key=${uniqueFileId}`, {
						method: 'DELETE',
						body: formData
					})
						.then((res) => res.json())
						.then((json) => {
							console.log(json);
							if (json.status == 'success') {
								// Should call the load method when done, no parameters required
								load();
							} else {
								// Can call the error method if something is wrong, should exit after
								error(err.msg);
							}
						})
						.catch((err) => {
							console.log(err);
							// Can call the error method if something is wrong, should exit after
							error(err.message);
						});
				},
				restore: (uniqueFileId, load, error, progress, abort, headers) => {
					let controller = new AbortController();
					let signal = controller.signal;

					fetch(`load.php?key=${uniqueFileId}`, {
						method: 'GET',
						signal
					})
						.then((res) => {
							window.c = res;
							console.log(res);
							const headers = res.headers;
							const contentLength = +headers.get('content-length');
							const contentDisposition = headers.get('content-disposition');
							let fileName = contentDisposition.split('filename=')[1];
							fileName = fileName.slice(1, fileName.length - 1);
							progress(true, contentLength, contentLength);
							return {
								blob: res.blob(),
								size: contentLength
							};
						})
						.then(({ blob, size }) => {
							console.log(blob);
							// headersString = 'Content-Disposition: inline; filename="my-file.jpg"'
							// headers(headersString);

							const imageFileObj = new File([blob], `${uniqueFileId}.${blob.type.split('/')[1]}`, {
								type: blob.type
							});
							console.log(imageFileObj);
							progress(true, size, size);
							load(imageFileObj);
						})
						.catch((err) => {
							console.log(err);
							error(err.message);
						});

					return {
						abort: () => {
							// User tapped cancel, abort our ongoing actions here
							controller.abort();
							// Let FilePond know the request has been cancelled
							abort();
						}
					};
				}
			}
		};

		// pond = FilePond.create(document.querySelector('.filepond'), {
		// 	allowMultiple: true,
		// 	instantUpload: false,
		// 	server: {
		// 		load: (src, load) => {
		// 			fetch(src)
		// 				.then((res) => res.blob())
		// 				.then(load);
		// 		}
		// 	},
		// 	files: []
		// });

		pond = FilePond.create(document.querySelector('.filepond'), {
			allowMultiple: true
		});

		pond.setOptions({
			server: {
				url: 'https://app.homerate.pl/public/uploads/',
				server: {
                process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                    const formData = new FormData();
                    formData.append(fieldName, file);
                    fetch('filepond.php', {
                        method: 'POST',
                        body: formData
                    }).then(response => {
                        return response.text();
                    }).then(response => {
                        var responseJSON = JSON.parse(response);
                        if (responseJSON.status === "error") {
                            alert(response.message);
                            error(response.message);
                        } else {
                            load(response);
                        }
                    }).catch(error => {
                        console.error('Error:', error);
                    });
                },
            },
            onremovefile: (error, file) => {
                if (!error) {
                    const fileData = {
                        method: "delete",
                        fileName: file.filename,
                        fileSize: file.fileSize,
                        fileType: file.fileType
                    };
                    const fileJson = JSON.stringify(fileData);
                    fetch('filepond.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: fileJson
                    }).then(response => {
                        return response.text();
                    }).then(response => {
                        var responseJSON = JSON.parse(response);
                        if (responseJSON.status === "error") {
                            alert(response.message);
                            error(response.message);
                        }
                    }).catch(error => {
                        console.error('Error:', error);
                    });
                }
            }
			}
		});
	});
	onDestroy(() => {
		// FilePond.destroy(inputElement);
	});
</script>

<input type="file" bind:this={inputElement} />
