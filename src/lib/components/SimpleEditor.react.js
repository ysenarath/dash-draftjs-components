import React, {useMemo, useEffect, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import '@draft-js-plugins/hashtag/lib/plugin.css';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
    defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
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
        mention_options,
        mention_suggestions,
        mention_open,
        command_options,
        command_suggestions,
        command_open,
        use_default_suggestions_filter,
        value,
    } = props;

    const setEditorState = (newEditorState) => {
        setProps({editor_state: newEditorState});
        // Extract plain text from the editor state and trigger callback if text changed
        const newText = newEditorState.getCurrentContent().getPlainText();
        if (newText !== value) {
            setProps({value: newText});
        }
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

    const {MentionSuggestions, CommandSuggestions, plugins} = useMemo(() => {
        // Create mention plugin for @ mentions
        const mentionPlugin = createMentionPlugin({
            mentionTrigger: '@',
            mentionPrefix: '@',
        });
        
        // Create command plugin for / commands (using mention plugin with different trigger)
        const commandPlugin = createMentionPlugin({
            mentionTrigger: '/',
            mentionPrefix: '/',
        });
        
        // Create hashtag plugin for # hashtags
        const hashtagPlugin = createHashtagPlugin();
        
        // eslint-disable-next-line no-shadow
        const {MentionSuggestions} = mentionPlugin;
        const {MentionSuggestions: CommandSuggestions} = commandPlugin;
        
        // eslint-disable-next-line no-shadow
        const plugins = [mentionPlugin, commandPlugin, hashtagPlugin];
        return {plugins, MentionSuggestions, CommandSuggestions};
    }, []);

    const onClickFocus = () => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    const onMentionOpenChange = useCallback((_open) => {
        setProps({mention_open: _open});
    }, []);

    const onMentionSearchChange = useCallback(({value}) => {
        if (use_default_suggestions_filter) {
            setProps({mention_suggestions: defaultSuggestionsFilter(value, mention_options)});
        }
    }, [mention_options, use_default_suggestions_filter]);

    const onCommandOpenChange = useCallback((_open) => {
        setProps({command_open: _open});
    }, []);

    const onCommandSearchChange = useCallback(({value}) => {
        if (use_default_suggestions_filter) {
            setProps({command_suggestions: defaultSuggestionsFilter(value, command_options)});
        }
    }, [command_options, use_default_suggestions_filter]);

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
                open={mention_open}
                onOpenChange={onMentionOpenChange}
                suggestions={mention_suggestions}
                onSearchChange={onMentionSearchChange}
                onAddMention={() => {
                    // get the mention object selected
                }}
            />
            <CommandSuggestions
                open={command_open}
                onOpenChange={onCommandOpenChange}
                suggestions={command_suggestions}
                onSearchChange={onCommandSearchChange}
                onAddMention={() => {
                    // get the command object selected
                }}
            />
        </div>
    );
};

SimpleEditor.defaultProps = {
    toggle_inline_style: null,
    editor_state: EditorState.createEmpty(),
    mention_options: [],
    mention_suggestions: [],
    mention_open: false,
    command_options: [],
    command_suggestions: [],
    command_open: false,
    use_default_suggestions_filter: true,
    value: '',
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
     * Array of mention options to display in the editor.
     * Each mention should have a name, link, and optionally an avatar.
     * This is used to render @ mentions in the editor.
     */
    mention_options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ),

    /**
     * Array of suggestions for @ mentions.
     * Each suggestion should have a name, link, and optionally an avatar.
     * This is used to provide mention suggestions in the editor.
     */
    mention_suggestions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ),

    /**
     * Indicates whether the mention suggestions dropdown is open.
     * This is used to control the visibility of the mention suggestions.
     */
    mention_open: PropTypes.bool,

    /**
     * Array of command options to display in the editor.
     * Each command should have a name, link, and optionally an avatar.
     * This is used to render / commands in the editor.
     */
    command_options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ),

    /**
     * Array of suggestions for / commands.
     * Each suggestion should have a name, link, and optionally an avatar.
     * This is used to provide command suggestions in the editor.
     */
    command_suggestions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ),

    /**
     * Indicates whether the command suggestions dropdown is open.
     * This is used to control the visibility of the command suggestions.
     */
    command_open: PropTypes.bool,

    /**
     * The plain text content of the editor.
     * This is automatically extracted from the editor state and updated when the content changes.
     */
    value: PropTypes.string,

    /**
     * Function to set properties in the parent component.
     * This is used to update the editor state and other properties.
     * @param {Object} props - The properties to set.
     */
    setProps: PropTypes.func,
};

export default SimpleEditor;
