import { useId } from "react";
// import ID;

import Button from "../_button/Button";
// import components;

import { formSchema } from "./_schema/formSchema";
// import Schema;

function Form({fieldsConfig, btnText}) {
    const ID = useId();
    const fieldsList = formSchema(fieldsConfig, ID);

    function submit(e) {
        e.preventDefault();
    }

    return(
        <div>
            <form onSubmit={submit}>
                {
                    fieldsList.map((item, index) => {
                        const TagLabel = item.label.component;
                        const TagField = item.field.component;

                        return (
                            <div key={index}>
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
                >
                    {btnText}
                </Button>

            </form>
        </div>
    )
}

export default Form;