import { useState, useEffect, useId } from "react";
// import hooks;

import { useForm } from "react-hook-form";
// import RHF;

import { zodResolver } from "@hookform/resolvers/zod";
// import Zod;

import { formSchema } from "./_schema/formSchema";
import { getCategories } from "../../services/api";
// import js;

import Button from "../_button/Button";
// import components;

import styleForm from "./Form.module.css";
// import css;

function Form({fieldsConfig, btnText, schemaZod, onSubmit}) {
    const [categories, setCategories] = useState([]);
    const ID = useId();

    useEffect(() => {
        async function fetchData() {
            const data = await getCategories();
            setCategories(data);
        }

        fetchData();

    }, []);

    const fieldsList = formSchema(fieldsConfig, ID, categories);

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: zodResolver(schemaZod)
    });

    function handleOnSubmit(project) {
        onSubmit(project)
    }

    return(
        <div>
            <form onSubmit={handleSubmit(handleOnSubmit)} className={styleForm.Form}>
                {
                    fieldsList.map((item, index) => {
                        const TagLabel = item.label.component;
                        const TagField = item.field.component;
                        const fieldName = item.field.props.name;

                        return (
                            <div key={index} className={styleForm.conteiner_fields}>
                                <TagLabel 
                                    {...item.label.props}
                                />
                                <TagField 
                                    {...item.field.props}
                                    {...register(fieldName)}
                                />
                                
                                {errors[fieldName] && (
                                    <span className={styleForm.error_message}>
                                        {errors[fieldName].message}
                                    </span>
                                )}

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