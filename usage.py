import dash_draftjs_components as ddc
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

app.layout = html.Div(
    [
        ddc.SimpleEditor(id="input"),
        html.Div(id="output"),
    ]
)


@callback(
    Output("output", "children"),
    Input("input", "editorState"),
)
def update_output(editor_state):
    if editor_state is None:
        return "No content"
    print(editor_state)
    return []


if __name__ == "__main__":
    app.run(debug=True)
