import { Approval, GoalType } from "~/entities";
import { EditIcon, TrashIcon } from "~/shared";
import { GOAL_CARD_TEXTS } from "../constants";

interface SetMenuItemsParams {
    isAdmin: boolean;
    goalType: GoalType;
    setIsUpdateModalOpen: (value: boolean) => void;
    setIsDeleteModalOpen: (value: boolean) => void;
    approval?: Approval;
}

const setMenuItems = ({
    isAdmin,
    goalType,
    setIsUpdateModalOpen,
    setIsDeleteModalOpen,
    approval
}: SetMenuItemsParams) => {
    return [
        ...(((!isAdmin && goalType !== GoalType.ManagerAssigned && approval === null) 
            || (isAdmin && approval === null)) ? [
            {
                icon: <EditIcon />,
                label: GOAL_CARD_TEXTS.EDIT_GOAL,
                onClick: () => setIsUpdateModalOpen(true),
                className: 'cursor-pointer'
            },
            {
                icon: <TrashIcon />,
                label: GOAL_CARD_TEXTS.DELETE_GOAL,
                onClick: () => setIsDeleteModalOpen(true),
                className: 'cursor-pointer'
            }
        ] : [
            {
                icon: <EditIcon />,
                label: approval !== null ? GOAL_CARD_TEXTS.NO_EDIT_GOAL_ALREADY_EVALUATED 
                                        : GOAL_CARD_TEXTS.NO_EDIT_GOAL_MANAGER_ASSIGNED,
                className: 'cursor-not-allowed',
                disabled: true
            },
            {
                icon: <TrashIcon />,
                label: approval !== null ? GOAL_CARD_TEXTS.NO_DELETE_GOAL_ALREADY_EVALUATED 
                                        : GOAL_CARD_TEXTS.NO_DELETE_GOAL_MANAGER_ASSIGNED,
                className: 'cursor-not-allowed',
                disabled: true
            }
        ])
    ];
};

export default setMenuItems;
