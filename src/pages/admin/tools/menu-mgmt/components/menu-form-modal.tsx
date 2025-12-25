import { useEffect, useState } from "react";

import Modal from "@/components/modal";

import useStore from "@/models/stores";
import { IMenuItem } from "@/models/types/admin/tools/menu";
import { DefaultMenuItem } from "@/models/schema/admin/tools/menu";

import InputField from "@/components/data-input/input-field";
import Checkbox from "@/components/data-input/checkbox";
import SelectOption from "@/components/data-input/select-option";


interface IMenuFormModalProps {
    mode: "new" | "edit" | "view";
    selectedMenu?: IMenuItem;
}

const MenuFormModal: React.FC<IMenuFormModalProps> = ({
    mode,
    selectedMenu
}) => {
    const menus = useStore((state) => state.menus);
    const isSubmitting = useStore((state) => state.isMenuLoading);
    const createMenu = useStore((state) => state.createMenu);
    const updateMenu = useStore((state) => state.updateMenu);
    const fetchMenus = useStore((state) => state.fetchMenus);
    const [formData, setFormData] = useState(DefaultMenuItem);

    useEffect(() => {
        if (mode === "edit" && selectedMenu) {
            setFormData(selectedMenu);
        } else {
            setFormData(DefaultMenuItem);
        }
    }, [mode, selectedMenu]);

    const parentMenuOptions = menus
        .filter((menu) => menu.parent_id === null)
        .map((menu) => ({
            value: menu.id,
            label: menu.title
        }
    ));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (mode === "new") {
                const response = await createMenu(formData);
            } else {
                if (formData.id) {
                    const response = await updateMenu(formData);
                }
            }
        } catch (error) {
            console.error("Failed to submit menu form:", error);
        }

        await fetchMenus();
        setFormData(DefaultMenuItem);
        closeModal();
    }

    const closeModal = () => {
        (document.getElementById('menu-form') as HTMLDialogElement).close();
    }

    const getModalTitle = () => {
        if (mode === "new") return "Create Menu Item";
        if (mode === "edit") return "Edit Menu Item";

        return "Menu Form";
    }

    const getButtonLabel = () => {
        if (mode === "new") return "Create";
        if (mode === "edit") return "Update";

        return "Submit";
    }

    return (
        <Modal id="menu-form" title={getModalTitle()}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <InputField
                    className="w-full"
                    legend="Title"
                    name="title"
                    value={formData.title}
                    required={true}
                    placeholder="Input menu title"
                    onChange={handleChange}
                />

                <div className="flex gap-4">
                    <SelectOption
                        legend="Parent"
                        name="parent_id"
                        value={formData.parent_id || ''}
                        options={parentMenuOptions}
                        onChange={handleChange}
                    />

                    <InputField
                        className="w-full"
                        legend="URL"
                        name="url"
                        value={formData.url}
                        required={true}
                        placeholder="Input menu URL"
                        onChange={handleChange}
                    />

                </div>

                <div className="flex gap-4">
                    <InputField
                        className="w-full"
                        legend="Order Index"
                        name="order_index"
                        type="number"
                        value={formData.order_index}
                        onChange={handleChange}
                    />

                    <Checkbox
                        legend="Hidden"
                        checked={formData.is_hidden}
                        name="is_hidden"
                        onChange={handleCheckboxChange}
                    />
                </div>

                <div className="modal-action">
                    <button
                        type="button"
                        className="btn btn-ghost mt-2 mr-2"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn mt-2"
                    >
                        {getButtonLabel()}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default MenuFormModal;