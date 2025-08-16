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
A simple text editor component using Draft.js.

Keyword arguments:

- id (string; optional):
    The unique identifier for the component.

- editor_state (dict; default EditorState.createEmpty()):
    The current state of the editor. This should be an instance of
    `EditorState`.

- open (boolean; default False):
    Indicates whether the This is used to control the visibility of
    the editor.

- options (list of dicts; optional):
    Array of mentions to display in the editor. Each mention should
    have a name, link, and optionally an avatar. This is used to
    render mentions in the editor.

    `options` is a list of dicts with keys:

    - name (string; required)

    - link (string; required)

    - avatar (string; optional)

- suggestions (list of dicts; optional):
    Array of suggestions for mentions. Each suggestion should have a
    name, link, and optionally an avatar. This is used to provide
    mention suggestions in the editor.

    `suggestions` is a list of dicts with keys:

    - name (string; required)

    - link (string; required)

    - avatar (string; optional)

- toggle_inline_style (string; optional):
    Number of times the bold button has been clicked. This is used to
    toggle the bold style in the editor.

- use_default_suggestions_filter (boolean; default True):
    Indicates whether to use the default suggestions filter. If True,
    the default filter will be used to filter suggestions based on
    user input."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_draftjs_components'
    _type = 'SimpleEditor'
    Options = TypedDict(
        "Options",
            {
            "name": str,
            "link": str,
            "avatar": NotRequired[str]
        }
    )

    Suggestions = TypedDict(
        "Suggestions",
            {
            "name": str,
            "link": str,
            "avatar": NotRequired[str]
        }
    )


    def __init__(
        self,
        id: typing.Optional[typing.Union[str, dict]] = None,
        editor_state: typing.Optional[dict] = None,
        toggle_inline_style: typing.Optional[str] = None,
        use_default_suggestions_filter: typing.Optional[bool] = None,
        options: typing.Optional[typing.Sequence["Options"]] = None,
        suggestions: typing.Optional[typing.Sequence["Suggestions"]] = None,
        open: typing.Optional[bool] = None,
        **kwargs
    ):
        self._prop_names = ['id', 'editor_state', 'open', 'options', 'suggestions', 'toggle_inline_style', 'use_default_suggestions_filter']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'editor_state', 'open', 'options', 'suggestions', 'toggle_inline_style', 'use_default_suggestions_filter']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(SimpleEditor, self).__init__(**args)

setattr(SimpleEditor, "__init__", _explicitize_args(SimpleEditor.__init__))
