% Auto-generated: do not edit by hand
\name{simpleEditor}

\alias{simpleEditor}

\title{SimpleEditor component}

\description{
A simple text editor component using Draft.js.
}

\usage{
simpleEditor(id=NULL, editor_state=NULL, open=NULL, options=NULL,
suggestions=NULL, toggle_inline_style=NULL,
use_default_suggestions_filter=NULL)
}

\arguments{
\item{id}{Character. The unique identifier for the component.}

\item{editor_state}{Named list. The current state of the editor.
This should be an instance of `EditorState`.}

\item{open}{Logical. Indicates whether the
This is used to control the visibility of the editor.}

\item{options}{List of lists containing elements 'name', 'link', 'avatar'.
those elements have the following types:
  - name (character; required)
  - link (character; required)
  - avatar (character; optional)s. Array of mentions to display in the editor.
Each mention should have a name, link, and optionally an avatar.
This is used to render mentions in the editor.}

\item{suggestions}{List of lists containing elements 'name', 'link', 'avatar'.
those elements have the following types:
  - name (character; required)
  - link (character; required)
  - avatar (character; optional)s. Array of suggestions for mentions.
Each suggestion should have a name, link, and optionally an avatar.
This is used to provide mention suggestions in the editor.}

\item{toggle_inline_style}{Character. Number of times the bold button has been clicked.
This is used to toggle the bold style in the editor.}

\item{use_default_suggestions_filter}{Logical. Indicates whether to use the default suggestions filter.
If true, the default filter will be used to filter suggestions based on user input.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

