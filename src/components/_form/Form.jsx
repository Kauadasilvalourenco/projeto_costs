import { useId } from "react";
// import ID;

import { formSchema } from "./_schema/formSchema";
// import Schema;

import Button from "../_button/Button";
// import components;

import styleForm from "./Form.module.css";

function Form({fieldsConfig, btnText}) {
    const ID = useId();
    const fieldsList = formSchema(fieldsConfig, ID);

    function submit(e) {
        e.preventDefault();
    }

    return(
        <div>
            <form onSubmit={submit} className={styleForm.Form}>
                {
                    fieldsList.map((item, index) => {
                        const TagLabel = item.label.component;
                        const TagField = item.field.component;

                        return (
                            <div key={index} className={styleForm.conteiner_fields}>
                                <TagLabel 
                                    {...item.label.props}
                                />
                                <TagField 
                                    {...item.field.props}
                                />
                            </div>
                        )
                    })
                }

                <Button
                   type={"submit"}
                   style={styleForm.button}
                >
                    {btnText}
                </Button>

            </form>
        </div>
    )
}

export default Form;