import React, {useMemo, useEffect, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
    defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import editorStyles from './SimpleEditor.module.css';

/**
 * A simple text editor component using Draft.js.
 */
const SimpleEditor = (props) => {
    const ref = useRef(null);

    const {
        id,
        setProps,
        editor_state,
        toggle_inline_style,
        options,
        suggestions,
        open,
        use_default_suggestions_filter,
    } = props;

    const setEditorState = (newEditorState) => {
        setProps({editor_state: newEditorState});
    };

    // listen for button clicks to toggle bold style
    useEffect(() => {
        if (toggle_inline_style !== null) {
            if (toggle_inline_style === 'CODE') {
                setEditorState(RichUtils.toggleCode(editor_state));
            } else {
                setEditorState(
                    RichUtils.toggleInlineStyle(
                        editor_state,
                        toggle_inline_style
                    )
                );
            }
            setProps({toggle_inline_style: null});
        }
    }, [toggle_inline_style]);

    const {MentionSuggestions, plugins} = useMemo(() => {
        const mentionPlugin = createMentionPlugin({
            mentionTrigger: '#',
            mentionPrefix: '#',
        });
        // eslint-disable-next-line no-shadow
        const {MentionSuggestions} = mentionPlugin;
        // eslint-disable-next-line no-shadow
        const plugins = [mentionPlugin];
        return {plugins, MentionSuggestions};
    }, []);

    const onClickFocus = () => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    const onOpenChange = useCallback((_open) => {
        setProps({open: _open});
    }, []);

    const onSearchChange = useCallback(({value}) => {
        if (use_default_suggestions_filter) {
            setProps({suggestions: defaultSuggestionsFilter(value, options)});
        }
    }, []);

    return (
        <div id={id} className={editorStyles.editor} onClick={onClickFocus}>
            <Editor
                editorKey={'editor'}
                editorState={editor_state}
                onChange={setEditorState}
                plugins={plugins}
                ref={ref}
            />
            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                suggestions={suggestions}
                onSearchChange={onSearchChange}
                onAddMention={() => {
                    // get the mention object selected
                }}
            />
        </div>
    );
};

SimpleEditor.defaultProps = {
    toggle_inline_style: null,
    editor_state: EditorState.createEmpty(),
    options: [],
    suggestions: [],
    open: false,
    use_default_suggestions_filter: true,
};

SimpleEditor.propTypes = {
    /**
     * The unique identifier for the component.
     */
    id: PropTypes.string,

    /**
     * The current state of the editor.
     * This should be an instance of `EditorState`.
     */
    editor_state: PropTypes.object,

    /**
     * Number of times the bold button has been clicked.
     * This is used to toggle the bold style in the editor.
     */
    toggle_inline_style: PropTypes.string,

    /**
     * Indicates whether to use the default suggestions filter.
     * If true, the default filter will be used to filter suggestions based on user input.
     */
    use_default_suggestions_filter: PropTypes.bool,

    /**
     * Array of mentions to display in the editor.
     * Each mention should have a name, link, and optionally an avatar.
     * This is used to render mentions in the editor.
     */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ),

    /**
     * Array of suggestions for mentions.
     * Each suggestion should have a name, link, and optionally an avatar.
     * This is used to provide mention suggestions in the editor.
     */
    suggestions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ),

    /**
     * Indicates whether the
     * This is used to control the visibility of the editor.
     */
    open: PropTypes.bool,

    /**
     * Function to set properties in the parent component.
     * This is used to update the editor state and other properties.
     * @param {Object} props - The properties to set.
     */
    setProps: PropTypes.func,
};

export default SimpleEditor;
