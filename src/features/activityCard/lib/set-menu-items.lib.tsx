import { Approval } from "~/entities";
import { EditIcon, TrashIcon } from "~/shared";
import { ACTIVITY_CARD_TEXTS } from "../constants";

interface SetMenuItemsParams {
    setIsUpdateModalOpen: (value: boolean) => void;
    setIsDeleteModalOpen: (value: boolean) => void;
    approval?: Approval;
}

const setMenuItems = ({
    setIsUpdateModalOpen,
    setIsDeleteModalOpen,
    approval
}: SetMenuItemsParams) => {
    return [
        ...((approval === null) ? [
            {
                icon: <EditIcon />,
                label: ACTIVITY_CARD_TEXTS.EDIT_ACTIVITY,
                onClick: () => setIsUpdateModalOpen(true),
                className: 'cursor-pointer'
            },
            {
                icon: <TrashIcon />,
                label: ACTIVITY_CARD_TEXTS.DELETE_ACTIVITY,
                onClick: () => setIsDeleteModalOpen(true),
                className: 'cursor-pointer'
            }
        ] : [
            {
                icon: <EditIcon />,
                label: ACTIVITY_CARD_TEXTS.NO_EDIT_ACTIVITY,
                className: 'cursor-not-allowed',
                disabled: true
            },
            {
                icon: <TrashIcon />,
                label: ACTIVITY_CARD_TEXTS.NO_DELETE_ACTIVITY,
                className: 'cursor-not-allowed',
                disabled: true
            }
        ])
    ];
};

export default setMenuItems;
