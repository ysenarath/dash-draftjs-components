import json
import dash_draftjs_components as ddc
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

app.layout = html.Div(
    [
        html.Button("Bold", id="bold-button", n_clicks=0),
        html.Button("Code", id="code-button", n_clicks=0),
        ddc.SimpleEditor(id="input"),
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
