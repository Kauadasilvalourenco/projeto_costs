import styleTypography from "./Typography.module.css";
// import css;

function Typography({tag, children, style}) {

    const configTags = {
        h1 : {tag : "h1", styleTag : styleTypography.h1},
        h2 : {tag : "h2", styleTag : styleTypography.h2},
        p : {tag : "p", styleTag : styleTypography.p}
    };

    const selectTag = configTags[tag] || configTags.p;

    const Tag = selectTag.tag;

    return (
        <Tag className={`${style} ${selectTag.styleTag}`} >
            {children}
        </Tag>
    )
}

export default Typography;