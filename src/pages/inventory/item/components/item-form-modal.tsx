import { useEffect, useState } from "react";

import Modal from "@/components/modal"
import InputField from "@/components/data-input/input-field";
import SelectOption from "@/components/data-input/select-option";
import Checkbox from "@/components/data-input/checkbox";

import useStore from "@/models/stores";
import { DefaultItem } from "@/models/schema/inventory/item";
import { IItem } from "@/models/types/inventory/item";

interface IItemFormModalProps {
    mode: string;
    selectedItem?: IItem;
}


const ItemFormModal: React.FC<IItemFormModalProps> = ({
    mode,
    selectedItem
}) => {
    const isSubmitting = useStore((state) => state.isItemLoading);
    const uoms = useStore((state) => state.uoms)
    const itemCategoryOptions = useStore((state) => state.lookupItems)
    const createItem = useStore((state) => state.createItem);
    const updateItem = useStore((state) => state.updateItem);
    const fetchItems = useStore((state) => state.fetchItems);
    const fetchUOMs = useStore((state) => state.fetchUOMs);
    const fetchItemCategory = useStore((state) => state.fetchLookupItemsByGroupCode)
    const [formData, setFormData] = useState(DefaultItem);

    useEffect(() => {
        if (mode === "edit" && selectedItem) {
            setFormData(selectedItem);
        } else {
            setFormData(DefaultItem);
        }
    }, [mode, selectedItem]);

    const uomOptions = uoms.map((uom) => ({
        value: uom.id,
        label: uom.symbol,
    }));

    useEffect(() => {
        fetchItemCategory("ITEM_CATEGORY");
    }, [fetchItemCategory])

    useEffect(() => {
        fetchUOMs();
    }, [fetchUOMs])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
                const response = await createItem(formData);
            } else {
                if (formData.id) {
                    const response = await updateItem(formData);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        await fetchItems();
        setFormData(DefaultItem);
        closeModal();
    }

    const closeModal = () => {
        (document.getElementById('item-form') as HTMLDialogElement).close();
    };

    const getModalTitle = () => {
        if (mode === "new") return "Create Item Data";
        if (mode === "edit") return "Edit Item Data";

        return "Item Form";
    }

    const getButtonLabel = () => {
        if (mode === "new") return "Add";
        if (mode === "edit") return "Update";

        return "Submit";
    }

    return (
        <Modal id="item-form" title={getModalTitle()}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <InputField
                    className="w-full"
                    legend="Name"
                    name="name"
                    value={formData.name}
                    required={true}
                    placeholder="Input item name"
                    onChange={handleChange}
                />
                <InputField
                    className="w-full"
                    legend="SKU"
                    label="ex. PEN-BLK-001"
                    name="sku"
                    value={formData.sku}
                    required={true}
                    placeholder="Input item SKU"
                    onChange={handleChange}
                />

                <SelectOption
                    legend="Category"
                    name="category"
                    value={formData.category}
                    required={true}
                    options={itemCategoryOptions}
                    onChange={handleChange}
                />

                <SelectOption
                    legend="UOM"
                    name="uom_id"
                    value={formData.uom_id}
                    required={true}
                    options={uomOptions}
                    onChange={handleChange}
                />

                <Checkbox
                    legend="Is Hidden"
                    name="is_hidden"
                    checked={formData.is_hidden || false}
                    onChange={handleCheckboxChange}
                />

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
    )
}

export default ItemFormModal;