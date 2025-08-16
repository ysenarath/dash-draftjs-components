# AUTO GENERATED FILE - DO NOT EDIT

export simpleeditor

"""
    simpleeditor(;kwargs...)

A SimpleEditor component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (String; optional)
- `editorState` (Dict; optional)
- `placeholder` (String; optional)
"""
function simpleeditor(; kwargs...)
        available_props = Symbol[:id, :editorState, :placeholder]
        wild_props = Symbol[]
        return Component("simpleeditor", "SimpleEditor", "dash_draftjs_components", available_props, wild_props; kwargs...)
end

