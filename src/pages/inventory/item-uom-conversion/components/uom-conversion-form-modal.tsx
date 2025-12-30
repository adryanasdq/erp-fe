import { useState, useMemo } from "react";

import InputField from "@/components/data-input/input-field";
import Modal from "@/components/modal"
import SelectOption from "@/components/data-input/select-option";

import useStore from "@/models/stores";
import { DefaultUOMConversion } from "@/models/schema/inventory/item-uom-conversion";


interface IUOMConversionFormModalProps {

}


const UOMConversionFormModal: React.FC<IUOMConversionFormModalProps> = ({

}) => {
    const isSubmitting = useStore((state) => state.isUOMConversionLoading);
    const createUOMConversion = useStore((state) => state.createUOMConversion);
    const fetchUOMConversions = useStore((state) => state.fetchUOMConversions);
    const items = useStore((state) => state.items);
    const uoms = useStore((state) => state.uoms);
    const [formData, setFormData] = useState(DefaultUOMConversion);
    const [uomIdSelectedItem, setUOMIdSelectedItem] = useState("");

    const itemOptions = items.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const uomOptions = useMemo(() => {
        if (!uomIdSelectedItem) return []

        const uomSelectedItem = uoms.find((uom) => uom.id == uomIdSelectedItem);
        const filteredUOMOptions = uoms.filter((uom) => uom.type == uomSelectedItem.type);

        return filteredUOMOptions.map((uom) => ({
            value: uom.id,
            label: uom.symbol
        }));
    }, [uomIdSelectedItem, uoms])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedItem = items.find((item) => item.id == e.target.value);

        setUOMIdSelectedItem(selectedItem.uom_id);
        setFormData((prev) => ({
            ...prev,
            "to_uom_id": selectedItem.uom_id
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await createUOMConversion(formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        await fetchUOMConversions();
        setFormData(DefaultUOMConversion);
        closeModal();
    }

    const closeModal = () => {
        (document.getElementById('uom-conversion-form') as HTMLDialogElement).close();
    };

    return (
        <Modal id="uom-conversion-form" title="Create UOM Conversion Data">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <SelectOption
                    legend="Item"
                    name="item_id"
                    value={formData.item_id}
                    required={true}
                    options={itemOptions}
                    onChange={(e) => { handleChange(e); handleItemChange(e); }}
                />

                <SelectOption
                    legend="From"
                    name="from_uom_id"
                    value={formData.from_uom_id}
                    required={true}
                    options={uomOptions}
                    onChange={handleChange}
                />

                <SelectOption
                    legend="To"
                    name="to_uom_id"
                    value={formData.to_uom_id}
                    required={true}
                    options={uomOptions}
                    onChange={handleChange}
                    disabled={true}
                />

                <InputField
                    className="w-full"
                    legend="Factor"
                    name="factor"
                    type="number"
                    value={formData.factor}
                    onChange={handleChange}
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
                        Add
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default UOMConversionFormModal;