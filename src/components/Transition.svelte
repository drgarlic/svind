<script>
    export let toggle;
    export let inTransition;
    export let inState;
    export let onState;
    export let outTransition = inTransition;
    export let outState = inState;
    export let offHidden = false;

    let visible = toggle;

    let initialized = false;
    let firstToggleState = toggle;
    $: firstToggleState !== toggle && (initialized = true);

    let state = visible ? onState : inState;
    let transition = '';

    const enterEvent = () => {
        if (offHidden && ! visible) {
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
    const leaveEvent = () => {
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

    $: initialized && (toggle ? enterEvent() : leaveEvent());

    $: transitions = `
        transition
        transform
        ${transition}
        ${state}
        ${offHidden && ! visible ? 'hidden' : ''}
    `;
</script>

<slot {transitions} />
