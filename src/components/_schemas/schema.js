import Label from "../_label/Label";
import Input from "../_input/Input";
import Select from "../_select/Select";
// import components;

import z from "zod/v3";
// import zod;


export const formSchema = (fieldsConfig = [], ID, categories) => {
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
                    id: `${finallyID}`,
                    options: categories
                }
            }
        };
    });
};

export function projectForm() {
    return (
        [
            {
                label: {
                    props: {
                        children: "Nome do Projeto: "
                    }
                },
                field: {
                    component: {
                        type: Input
                    },
                    props: {
                        name: "nome_projeto", type: "text", placeholder: "EX: Criação Landing Page"
                    }
                }
            },
            {
                label: {
                    props: {
                        children: "Orçamento do Projeto: "
                    }
                },
                field: {
                    component: {
                        type: Input
                    },
                    props: {
                        name: "orcamento_projeto", type: "number", placeholder: "EX: R$5000,00"
                    }
                }
            },
            {
                label: {
                    props: {
                        children: "Selecione uma Categoria: "
                    }
                },
                field: {
                    component: {
                        type: Select
                    },
                    props: {
                        name: "categoria_projeto",
                    }
                }
            }
        ]
    );
};

export function validationProjectForm() {
    return (
        z.object({
            nome_projeto: z.string()
            .min(1, "O campo não pode ser nulo!")
            .regex(/^(?!\d+$).+$/, "O nome do projeto não pode ser composto somente por números"),

            orcamento_projeto: z.coerce.number()
            .min(1, "O campo não pode ser nulo!"),

            categoria_projeto: z.string()
            .min(1, "É preciso selecionar uma categoria!")
        })
    );
};

export function editProjectForm() {
    return (
        [
            {
                label: {
                    props: {
                        children: "Nome do Projeto:"
                    }
                },
                field: {
                    component: {
                        type: Input
                    },
                    props: {
                        name: "nome_projeto", type: "text", placeholder: "EX: Criação Landing-Page"
                    }
                }
            },

            {
                label: {
                    props: {
                        children: "Orçamento do Projeto:"
                    }
                },
                field: {
                    component: {
                        type: Input
                    },
                    props: {
                        name: "orcamento_projeto", type: "number", placeholder: "EX: R$5000,00"
                    }
                }
            },

            {
                label: {
                    props: {
                        children: "Selecione uma Categoria"
                    }
                },
                field: {
                    component: {
                        type: Select
                    },
                    props: {
                        name: "categoria_projeto"
                    }
                }
            }
        ]
    );
};

export function validationEditProjectForm() {
    return (
        z.object({
            nome_projeto: z.string()
            .min(1, "O campo não pode ser nulo!")
            .regex(/^(?!\d+$).+$/, "O nome do projeto não pode ser composto somente por números"),

            orcamento_projeto: z.coerce.number()
            .min(1, "O campo não pode ser nulo!"),

            categoria_projeto: z.string()
            .min(1, "É preciso selecionar uma categoria!")
        })
    );
};

export function createServiceForm() {
    return (
        [
            {
                label: {
                    props: {
                        children: "Nome do Serviço:"
                    }
                },
                field: {
                    component: {
                        type: Input
                    },
                    props: {
                        name: "nome_servico", type: "text", placeholder: "EX: Contratar Dev Front-End"
                    }
                }
            },

            {
                label: {
                    props: {
                        children: "Custo do Serviço:"
                    }
                },
                field: {
                    component: {
                        type: Input
                    },
                    props: {
                        name: "custo_servico", type: "number", placeholder: "EX: R$3500,00"
                    }
                }
            }
        ]
    );
};

export function validationCreateServiceForm() {
    return (
        z.object({
            nome_servico: z.string()
            .min(1, "O campo não pode ser nulo!")
            .regex(/^(?!\d+$).+$/, "O nome do serviço não pode ser composto somente por números"),

            custo_servico: z.coerce.number()
            .min(1, "O campo não pode ser nulo!")
        })
    );
};