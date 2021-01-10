export class MicpIcon {
    get name () {
        return 'micp_icon';
    }

    get schema () {
        return {
            attrs: {
                src: {
                    default: null
                }
            },
            group: 'block',
            selectable: false,
            parseDOM: [
                {
                    tag: 'micp_icon',
                    getAttrs: dom => ({
                        src: dom.getAttribute('src')
                    })
                }
            ],
            toDOM: node => [
                'micp_icon',
                {
                    src: node.attrs.src
                }
            ]
        };
    }

    commands ({ type }) {
        return attrs => (state, dispatch) => {
            const { selection } = state;
            const position = selection.$cursor
                ? selection.$cursor.pos
                : selection.$to.pos;
            const node = type.create(attrs);
            const transaction = state.tr.insert(position, node);
            dispatch(transaction);
        };
    }

    get view () {
        return {
            props: ['node', 'updateAttrs', 'view'],
            computed: {
                src: {
                    get () {
                        return this.node.attrs.src;
                    },
                    set (src) {
                        this.updateAttrs({
                            src
                        });
                    }
                }
            },
            template: `
                <div class='micp_tiptap_icon'>
                    TEST
                </div>
            `
        };
    }
}
