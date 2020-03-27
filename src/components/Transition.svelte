<script>
    export let toggle;
    export let inTransition;
    export let inState;
    export let onState;
    export let outTransition;
    export let outState = undefined;
    export let startsHidden = false;

    outState = ! outState && inState;

    let visible = false;

    let initialized = false;
    let firstToggleState = toggle;
    $: firstToggleState !== toggle && (initialized = true);

    let state = inState;
    let transition = '';

    const startEnterEvent = () => {
        if (startsHidden && ! visible) {
            visible = true;
            setTimeout(() => {
                transition = inTransition;
                state = onState;
            }, 50);
        } else {
            transition = inTransition;
            state = onState;
        }
    };

    let leaveEventQueue = [];
    const startLeaveEvent = () => {
        transition = outTransition;
        state = outState;
        const regex = /duration-[0-9]+/g;
        const resultRegex = transition.match(regex);
        const duration = resultRegex ? parseInt(resultRegex[0].substr(9)) : 1000;
        leaveEventQueue.push(setTimeout(() => {
            if (leaveEventQueue.length === 1 && ! toggle) {
                state = inState;
                transition = '';
                visible = false;
            }
            leaveEventQueue.shift();
        }, duration));
    }

    $: initialized && (toggle ? startEnterEvent() : startLeaveEvent());

    $: transitions = `
        transition
        transform
        ${transition}
        ${state}
        ${startsHidden && ! visible ? 'hidden' : ''}
    `;
</script>

<slot {transitions} />
