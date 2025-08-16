import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './SimpleEditor.css';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
const SimpleEditor = (props) => {
    const {id, setProps, editorState, placeholder } = props;

    const onChange = (newEditorState) => {
        setProps({ editorState: newEditorState });
    };

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
    
        if (newState) {
            onChange(newState);
            return 'handled';
        }
    
        return 'not-handled';
      }

    const _onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }
    

    return (
        <div id={id} className="dash-draft-editor">
            <button onClick={_onBoldClick}>Bold</button>
            <hr />
            <Editor editorState={editorState}  onChange={onChange} placeholder={placeholder} handleKeyCommand={handleKeyCommand} />
        </div>
    );
}

SimpleEditor.defaultProps = {
    editorState: EditorState.createEmpty()
};

SimpleEditor.propTypes = {
    id: PropTypes.string,

    editorState: PropTypes.object,

    placeholder: PropTypes.string,

    setProps: PropTypes.func
};

export default SimpleEditor;
