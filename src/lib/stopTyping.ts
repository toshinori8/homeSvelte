export function stopTyping(node) {
    const handleKeyup = debounce((event: KeyboardEvent) => { // (1) the debounce logic
        if (node.contains(event.target)) { // (2) restrict the event to the only referring node 
            node.dispatchEvent(new CustomEvent('stopTyping')); // (3) fire the event
        }
    }, 2500);

    // (4) add a generic keyup event
    document.addEventListener('keyup', handleKeyup, true);

    return {
        destroy() {
            // (5) cleanup on destroy
            document.removeEventListener('keyup', handleKeyup, true);
        }
    };
}

function debounce(inputFunction, timeToWaitBeforeFiringInMs = 5000) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            inputFunction.apply(this, args);
        }, timeToWaitBeforeFiringInMs);
    };
}