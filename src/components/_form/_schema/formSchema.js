import Label from "../../_label/Label";

export const formSchema = (fieldsConfig = [], ID) => {
    return fieldsConfig.map((obj) => {
        const finallyID = `${ID}-${obj.field.props.name}`;

        return {
            label: {
                component: Label,
                props: {
                    children: obj.label.props.children,
                    htmlFor: `${finallyID}`
                }
            },
            field: {
                component: obj.field.component.type,
                props: {
                    ...obj.field.props,
                    id: `${finallyID}`
                }
            }
        };
    });
};