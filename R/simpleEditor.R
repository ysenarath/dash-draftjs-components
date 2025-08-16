# AUTO GENERATED FILE - DO NOT EDIT

#' @export
simpleEditor <- function(id=NULL, editorState=NULL, placeholder=NULL) {
    
    props <- list(id=id, editorState=editorState, placeholder=placeholder)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'SimpleEditor',
        namespace = 'dash_draftjs_components',
        propNames = c('id', 'editorState', 'placeholder'),
        package = 'dashDraftjsComponents'
        )

    structure(component, class = c('dash_component', 'list'))
}
