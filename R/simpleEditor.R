# AUTO GENERATED FILE - DO NOT EDIT

#' @export
simpleEditor <- function(id=NULL, editor_state=NULL, open=NULL, options=NULL, suggestions=NULL, toggle_inline_style=NULL, use_default_suggestions_filter=NULL) {
    
    props <- list(id=id, editor_state=editor_state, open=open, options=options, suggestions=suggestions, toggle_inline_style=toggle_inline_style, use_default_suggestions_filter=use_default_suggestions_filter)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'SimpleEditor',
        namespace = 'dash_draftjs_components',
        propNames = c('id', 'editor_state', 'open', 'options', 'suggestions', 'toggle_inline_style', 'use_default_suggestions_filter'),
        package = 'dashDraftjsComponents'
        )

    structure(component, class = c('dash_component', 'list'))
}
