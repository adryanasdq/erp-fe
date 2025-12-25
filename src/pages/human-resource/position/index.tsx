import { useEffect, useMemo, useState } from "react";

import useStore from "@/models/stores/index";
import { IPosition } from "@/models/types/human-resource/position";

import PositionTable from "./components/position-table";
import PositionFormModal from "./components/position-form-modal";


const PositionPage = () => {
    const positions = useStore((state) => state.positions);
    const fetchPositions = useStore((state) => state.fetchPositions);
    const deletePosition = useStore((state) => state.deletePosition);

    const [selectedPosition, setSelectedPosition] = useState<IPosition | null>(null);
    const [formDialogMode, setFormDialogMode] = useState<"new" | "edit" | "view">("new");
    const [searchText, setSearchText] = useState("");

    const filteredPosition = useMemo(() => {
        return positions.filter((pos) => {
            return pos.title.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [positions, searchText])

    useEffect(() => {
        fetchPositions();
    }, [fetchPositions])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleEdit = (posId: string) => {
        const pos = positions.find((e) => e.id === posId) || null;

        setSelectedPosition(pos);
        setFormDialogMode("edit");
        (document.getElementById("pos-form") as HTMLDialogElement).showModal();
    }

    const handleDelete = async (posId: string) => {
        if (confirm("Are you sure want to delete this position?")) {
            deletePosition(posId);
        }

        await fetchPositions();
    }

    const openModal = () => {
        setFormDialogMode("new");
        (document.getElementById("pos-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <PositionFormModal
                mode={formDialogMode}
                selectedPosition={selectedPosition}
            />

            <div className="text-4xl mt-4 mb-8">Position</div>

            <PositionTable
                data={filteredPosition}
                openModal={openModal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchText={searchText}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default PositionPage;