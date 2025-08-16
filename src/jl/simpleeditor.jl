# AUTO GENERATED FILE - DO NOT EDIT

export simpleeditor

"""
    simpleeditor(;kwargs...)

A SimpleEditor component.
A simple text editor component using Draft.js.
Keyword arguments:
- `id` (String; optional): The unique identifier for the component.
- `editor_state` (Dict; optional): The current state of the editor.
This should be an instance of `EditorState`.
- `open` (Bool; optional): Indicates whether the
This is used to control the visibility of the editor.
- `options` (optional): Array of mentions to display in the editor.
Each mention should have a name, link, and optionally an avatar.
This is used to render mentions in the editor.. options has the following type: Array of lists containing elements 'name', 'link', 'avatar'.
Those elements have the following types:
  - `name` (String; required)
  - `link` (String; required)
  - `avatar` (String; optional)s
- `suggestions` (optional): Array of suggestions for mentions.
Each suggestion should have a name, link, and optionally an avatar.
This is used to provide mention suggestions in the editor.. suggestions has the following type: Array of lists containing elements 'name', 'link', 'avatar'.
Those elements have the following types:
  - `name` (String; required)
  - `link` (String; required)
  - `avatar` (String; optional)s
- `toggle_inline_style` (String; optional): Number of times the bold button has been clicked.
This is used to toggle the bold style in the editor.
- `use_default_suggestions_filter` (Bool; optional): Indicates whether to use the default suggestions filter.
If true, the default filter will be used to filter suggestions based on user input.
"""
function simpleeditor(; kwargs...)
        available_props = Symbol[:id, :editor_state, :open, :options, :suggestions, :toggle_inline_style, :use_default_suggestions_filter]
        wild_props = Symbol[]
        return Component("simpleeditor", "SimpleEditor", "dash_draftjs_components", available_props, wild_props; kwargs...)
end

