import { useState } from "react";

import InputField from "@/components/data-input/input-field";
import Modal from "@/components/modal"
import SelectOption from "@/components/data-input/select-option";

import useStore from "@/models/stores";
import { DefaultFormModal } from "@/models/schema/inventory/stock-movement";
import { IStockMovement, IStockTransfer, IFormModal } from "@/models/types/inventory/stock-movement";

interface IStockMovementFormModalProps {
    
}


const StockMovementFormModal: React.FC<IStockMovementFormModalProps> = ({
    
}) => {
    const items = useStore((state) => state.items);
    const uoms = useStore((state) => state.uoms);
    const warehouses = useStore((state) => state.warehouses);
    const movementTypes = useStore((state) => state.lookupItems);
    const isSubmitting = useStore((state) => state.isStockMovementLoading);
    const [formData, setFormData] = useState(DefaultFormModal);

    const fetchStockMovements = useStore((state) => state.fetchStockMovements);
    const createStockMovement = useStore((state) => state.createStockMovement);
    const createStockTransfer = useStore((state) => state.createStockTransfer);

    const itemOptions = items.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const movementTypesOptions = movementTypes.map((type) => ({
        value: type.value,
        label: type.label,
    }));

    const uomOptions = uoms.map((uom) => ({
        value: uom.id,
        label: uom.symbol,
    }));

    const warehousesOptions = warehouses.map((warehouse) => ({
        value: warehouse.id,
        label: warehouse.name,
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (formData.type === "trf") {
                const stockTransferPayload: IStockTransfer = {
                    item_id: formData.item_id,
                    qty: formData.qty,
                    from_warehouse_id: formData.from_warehouse_id || "",
                    to_warehouse_id: formData.to_warehouse_id || "",
                    uom_id: formData.uom_id,
                };

                await createStockTransfer(stockTransferPayload);
            } else {
                const stockMovementPayload: IStockMovement = {
                    item_id: formData.item_id,
                    qty: formData.qty,
                    type: formData.type,
                    uom_id: formData.uom_id,
                    warehouse_id: formData.warehouse_id || "",
                };

                await createStockMovement(stockMovementPayload);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        await fetchStockMovements();
        setFormData(DefaultFormModal);
        closeModal();
    }

    const closeModal = () => {
        (document.getElementById('stock-movement-form') as HTMLDialogElement).close();
    };

    return (
        <Modal id="stock-movement-form" title="Create Stock Movement">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <SelectOption
                    legend="Type"
                    name="type"
                    value={formData.type}
                    required={true}
                    options={movementTypesOptions}
                    onChange={handleChange}
                />

                <SelectOption
                    legend="Item"
                    name="item_id"
                    value={formData.item_id}
                    required={true}
                    options={itemOptions}
                    onChange={handleChange}
                />

                <InputField
                    className="w-full"
                    legend="Quantity"
                    name="qty"
                    type="number"
                    value={formData.qty}
                    required={true}
                    placeholder="Input quantity"
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

                {formData.type === "trf" && (
                    <>
                        <SelectOption
                            legend="From Warehouse"
                            name="from_warehouse_id"
                            value={formData.from_warehouse_id}
                            required={true}
                            options={warehousesOptions}
                            onChange={handleChange}
                        />

                        <SelectOption
                            legend="To Warehouse"
                            name="to_warehouse_id"
                            value={formData.to_warehouse_id}
                            required={true}
                            options={warehousesOptions}
                            onChange={handleChange}
                        />
                    </>
                )}

                {formData.type !== "trf" && (
                    <SelectOption
                        legend="Warehouse"
                        name="warehouse_id"
                        value={formData.warehouse_id}
                        required={true}
                        options={warehousesOptions}
                        onChange={handleChange}
                    />
                )}

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

export default StockMovementFormModal;
