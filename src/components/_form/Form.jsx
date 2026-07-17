import { useId } from "react";
// import hooks;

import { useLocation } from "react-router-dom";
// import router;

import { useForm } from "react-hook-form";
// import RHF;

import { zodResolver } from "@hookform/resolvers/zod";
// import Zod;

import { formSchema } from "./_schema/formSchema";
// import js;

import Button from "../_button/Button";
// import components;

import styleForm from "./Form.module.css";
// import css;

import { FaSave } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
// import icons;

function Form({fieldsConfig, btnText, schemaZod, onSubmit, onCategories, formData}) {
    const ID = useId();
    const location = useLocation();

    const fieldsList = formSchema(fieldsConfig, ID, onCategories);
    const createProjectPage = location.pathname === "/criar-projeto";

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: zodResolver(schemaZod),
        defaultValues: formData || {}
    });

    function handleOnSubmit(project) {
        onSubmit(project);
    };

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

                <div className={styleForm.conteiner_button}>
                    {
                        createProjectPage === true ? (
                            <Button
                                type={"submit"}
                                style={styleForm.button}
                            >
                                <IoMdAddCircleOutline className={styleForm.create_icon}/>
                                {btnText}
                            </Button>
                        ) : (
                            <Button
                                type={"submit"}
                                style={styleForm.button}
                            >
                                <FaSave className={styleForm.save_icon}/>
                                {btnText}
                            </Button>
                        )
                    }
                </div>

            </form>
        </div>
    )
}

export default Form;