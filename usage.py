import json
import dash_draftjs_components as ddc
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

# Mention options for @ mentions
mentions = [
    {
        "name": "Matthew Russell",
        "link": "https://twitter.com/mrussell247",
        "avatar": "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg",
    },
    {
        "name": "Julian Krispel-Samsel",
        "link": "https://twitter.com/juliandoesstuff",
        "avatar": "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400",
    },
    {
        "name": "Jyoti Puri",
        "link": "https://twitter.com/jyopur",
        "avatar": "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400",
    },
    {
        "name": "Max Stoiber",
        "link": "https://twitter.com/mxstbr",
        "avatar": "https://avatars0.githubusercontent.com/u/7525670?s=200&v=4",
    },
    {
        "name": "Nik Graf",
        "link": "https://twitter.com/nikgraf",
        "avatar": "https://avatars0.githubusercontent.com/u/223045?v=3&s=400",
    },
    {
        "name": "Pascal Brandt",
        "link": "https://twitter.com/psbrandt",
        "avatar": "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png",
    },
]

# Command options for / commands
commands = [
    {
        "name": "bold",
        "link": "/bold",
        "avatar": "💪",
    },
    {
        "name": "italic",
        "link": "/italic",
        "avatar": "📝",
    },
    {
        "name": "heading",
        "link": "/heading",
        "avatar": "📰",
    },
    {
        "name": "list",
        "link": "/list",
        "avatar": "📋",
    },
    {
        "name": "quote",
        "link": "/quote",
        "avatar": "💬",
    },
    {
        "name": "code",
        "link": "/code",
        "avatar": "💻",
    },
]
app.layout = html.Div(
    [
        html.H1("DraftJS Editor with Mentions (@), Hashtags (#), and Commands (/)"),
        html.P("Try typing @ to mention someone, # for hashtags, or / for commands!"),
        html.Button("Bold", id="bold-button", n_clicks=0),
        html.Button("Code", id="code-button", n_clicks=0),
        ddc.SimpleEditor(
            id="input",
            mention_options=mentions,
            command_options=commands,
            mention_suggestions=[],
            command_suggestions=[],
            mention_open=False,
            command_open=False,
        ),
        html.Div(id="output"),
    ]
)


@callback(
    Output("output", "children"),
    Input("input", "editor_state"),
)
def update_output(editor_state):
    if editor_state is None:
        return "No content"
    # return html.Pre(json.dumps(editor_state, indent=2))
    return []


@callback(
    Output("input", "toggle_inline_style", allow_duplicate=True),
    Input("bold-button", "n_clicks"),
    prevent_initial_call=True,
)
def update_bold_click_count(n_clicks):
    return "BOLD"


@callback(
    Output("input", "toggle_inline_style"),
    Input("code-button", "n_clicks"),
    prevent_initial_call=True,
)
def update_code_click_count(n_clicks):
    return "CODE"


if __name__ == "__main__":
    app.run(debug=True)
