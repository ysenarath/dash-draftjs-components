import dash_draftjs_components as ddc
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

app.layout = html.Div(
    [
        ddc.Editor(id="input", value="my-value", label="my-label"),
        html.Div(id="output"),
    ]
)


@callback(Output("output", "children"), Input("input", "value"))
def display_output(value):
    return "You have entered {}".format(value)


if __name__ == "__main__":
    app.run(debug=True)
