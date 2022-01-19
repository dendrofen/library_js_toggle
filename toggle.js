const jsToggle = {
    init() {
        this.listeners();
        return this;
    },
    listeners() {
        document.querySelectorAll('.js__toggle-class').forEach(item => {
            item.addEventListener('click', function () {
                if (this.dataset.toggle) {
                    for (const prop in this.dataset) {
                        let func = jsToggle[prop] || null;
                        if (func) {
                            func(this, this.dataset[prop], this.dataset.toggle);
                        }
                    }
                }
            });
        })
    },
    processElementWithDeps(el, className, action) {
        el.classList[action](className);

        //if contains internal deps
        let extraTargetSelector = el.dataset.toggleThisTarget;
        if (extraTargetSelector) {
            el.querySelectorAll(extraTargetSelector).forEach(item => {
                jsToggle.processElementWithDeps(item, className, action);
            })
        }

        let extraDocumentSelector = el.dataset.toggleDocumentTarget;
        if (extraDocumentSelector) {
            document.querySelectorAll(extraDocumentSelector).forEach(item => {
                action === 'toggle' ? jsToggle.toggle(item, className) : jsToggle.processElementWithDeps(item, className, action);
            })
        }
    },
    remove(el, className) {
        jsToggle.processElementWithDeps(el, className, 'remove');
    },
    toggle(el, className) {
        if (el.dataset.toggleGroup) {
            if (el.classList.contains(className)) {
                return;
            }

            jsToggle.processGroup(el, el.dataset.toggleGroup, className);
        }

        jsToggle.processElementWithDeps(el, className, 'toggle');

        document.dispatchEvent(new CustomEvent('js_toggle_after_toggle', { detail: { el, className } }));
    },
    processGroup(el, selector, className) {
        document.querySelectorAll('[data-toggle-group="' + selector + '"][data-toggle="' + className + '"]').forEach(item => {
            jsToggle.remove(item, className);
        })
    }
}.init();
