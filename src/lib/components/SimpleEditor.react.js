import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './SimpleEditor.css';

/**
 * A simple text editor component using Draft.js.
 */
const SimpleEditor = (props) => {
    const {id, setProps, editor_state, placeholder, toggle_inline_style} = props;

    const onChange = (newEditorState) => {
        setProps({ editor_state: newEditorState });
    };

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
    
        if (newState) {
            onChange(newState);
            return 'handled';
        }
    
        return 'not-handled';
      };


    // listen for button clicks to toggle bold style
    useEffect(() => {
        if (toggle_inline_style !== null) {
            if (toggle_inline_style === "CODE") {
                onChange(RichUtils.toggleCode(editor_state));
            } else {
                onChange(RichUtils.toggleInlineStyle(editor_state, toggle_inline_style));
            }
            setProps({ toggle_inline_style: null });
        }
    }, [toggle_inline_style]);
    

    return (
        <div id={id} className="dash-draft-editor">
            <Editor 
                editorState={editor_state}  
                onChange={onChange} 
                placeholder={placeholder} 
                handleKeyCommand={handleKeyCommand} 
            />
        </div>
    );
}

SimpleEditor.defaultProps = {
    toggle_inline_style: null,
    editor_state: EditorState.createEmpty(),
    placeholder: 'Type something...'
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
     * Placeholder text for the editor when it is empty.
     * This is displayed when the editor is focused and has no content.
     */
    placeholder: PropTypes.string,

    /**
     * Number of times the bold button has been clicked.
     * This is used to toggle the bold style in the editor.
     */
    toggle_inline_style: PropTypes.string,

    /**
     * Function to set properties in the parent component.
     * This is used to update the editor state and other properties.
     * @param {Object} props - The properties to set.
     */
    setProps: PropTypes.func
};

export default SimpleEditor;
