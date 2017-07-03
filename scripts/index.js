((document, undefined) => {
    document.addEventListener('DOMContentLoaded', () => {
        const dom = {
            percent: {
                from: document.getElementById('percent-from'),
                diffPercent: document.getElementById('percent-diff'),
                output:  document.getElementById('percent-output')
            },
            number: {
                from: document.getElementById('number-from'),
                to: document.getElementById('number-to'),
                output: document.getElementById('number-output')
            }
        }

        const storage = {
            save: saveState => {
                return localStorage.setItem('state', JSON.stringify(saveState));
            },
            load: () => {
                return JSON.parse(localStorage.getItem('state'))
            }
        }

        let state = {
            // initial state values
            percent: {
                from: 1,
                diffPercent: 10, 
            },
            number: {
                from: 1,
                to: 1.1
            }
        }

        const render = state => {
            renderPercentResult(state.percent);
            renderNumberResult(state.number);
        }

        const renderPercentResult = statePercent => {
            const { from, diffPercent } = statePercent;
            const increase = (diffPercent / 100) * from;
            dom.percent.output.textContent = (from + increase).toFixed(4);
        };

        const renderNumberResult = stateNumber => {
            const { from, to } = stateNumber;
            const changePercent = (((to - from) / from) * 100);
            dom.number.output.textContent = `${changePercent.toFixed(2)}%`;
        };

        const update = updatedProps => {
            const newState = {
                percent: Object.assign({}, state.percent, updatedProps.percent),
                number: Object.assign({}, state.number, updatedProps.number)
            };

            state = newState;
            storage.save(newState);
            render(newState);
        }

        const onInputPercentFrom = e => {
            update({ percent: { from: parseFloat(e.target.value) }});
        }

        const onInputPercentDiff = e => {
            update({ percent: { diffPercent: parseFloat(e.target.value) }});
        }

        const onInputNumberFrom = e => {
            update({ number: { from: parseFloat(e.target.value) }});
        }

        const onInputNumberTo = e => {
            update({ number: { to: parseFloat(e.target.value) }});
        }

        (() => {
            // initialize
            const newState = storage.load() || state;
            const { percent, number } = dom;

            percent.from.value = newState.percent.from;
            percent.diffPercent.value = newState.percent.diffPercent;
            percent.from.addEventListener('input', onInputPercentFrom);
            percent.diffPercent.addEventListener('input', onInputPercentDiff);
            
            number.from.value = newState.number.from;
            number.to.value = newState.number.to;
            number.from.addEventListener('input', onInputNumberFrom);
            number.to.addEventListener('input', onInputNumberTo);

            update(newState);
        })();
    });
})(window.document);

