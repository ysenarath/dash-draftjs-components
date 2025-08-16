# AUTO GENERATED FILE - DO NOT EDIT

import typing  # noqa: F401
from typing_extensions import TypedDict, NotRequired, Literal # noqa: F401
from dash.development.base_component import Component, _explicitize_args

ComponentType = typing.Union[
    str,
    int,
    float,
    Component,
    None,
    typing.Sequence[typing.Union[str, int, float, Component, None]],
]

NumberType = typing.Union[
    typing.SupportsFloat, typing.SupportsInt, typing.SupportsComplex
]


class SimpleEditor(Component):
    """A SimpleEditor component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.

Keyword arguments:

- id (string; optional)

- editorState (dict; default EditorState.createEmpty())

- placeholder (string; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_draftjs_components'
    _type = 'SimpleEditor'


    def __init__(
        self,
        id: typing.Optional[typing.Union[str, dict]] = None,
        editorState: typing.Optional[dict] = None,
        placeholder: typing.Optional[str] = None,
        **kwargs
    ):
        self._prop_names = ['id', 'editorState', 'placeholder']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'editorState', 'placeholder']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(SimpleEditor, self).__init__(**args)

setattr(SimpleEditor, "__init__", _explicitize_args(SimpleEditor.__init__))
