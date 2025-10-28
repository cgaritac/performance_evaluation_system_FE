import { useState } from "react";
import { ActivityResponseModel, useDeleteActivity, usePutActivity } from "~/entities";
import { ActivityForm, ActivityFormData, DeleteModal, EditModal } from "~/features";
import { EllipsisMenu, getFormattedDate, useAppStore } from "~/shared";
import { ACTIVITY_CARD_TEXTS } from "../constants";
import { setMenuItems } from "../lib";

interface ActivityCardProps {
    activity: ActivityResponseModel;
    index: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index }) => {
    const { goalSelected } = useAppStore();
    const { mutate: deleteActivity, isPending: isDeletingActivity } = useDeleteActivity();
    const { mutate: updateActivity, isPending: isUpdatingActivity } = usePutActivity();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        
    const handleDeleteActivity = (activityId: number) => {
        if (isDeletingActivity) return;
        deleteActivity({ id: activityId, activity });
        setIsDeleteModalOpen(false);
    };

    const handleUpdateActivity = (data: ActivityFormData) => {
        if (isUpdatingActivity) return;
        updateActivity({ 
            id: activity.id, 
            activity: {
                ...data,
                id: activity.id,
                goalId: activity.goalId
            }
        });
        setIsUpdateModalOpen(false);
    };

    const menuItems = setMenuItems({
        setIsUpdateModalOpen,
        setIsDeleteModalOpen,
        approval: goalSelected?.approval
    });

    return (
        <>
            <article className="flex flex-col gap-4 p-4 bg-fk-light-gray rounded-2xl shadow-md border 
                            border-gray-100 transition-all duration-300 ease-in-out 
                            hover:shadow-xl hover:shadow-blue-100/80 hover:border-blue-100
                            hover:scale-101 hover:transition-all hover:duration-400 hover:ease-in-out" 
                            role="article" 
                            aria-labelledby={`activity-title-${activity.title}`}>
                <header className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold" id={`activity-title-${activity.title}`}>
                            {activity.title}
                        </h2>
                    </div>

                    <EllipsisMenu items={menuItems} />
                </header>

                <section 
                    className="text-sm text-gray-500 border border-dashed border-gray-200 rounded-md 
                                px-2 py-0.5 mt-2 mr-2 h-36 overflow-y-auto bg-[#fbfbfb]"
                    role="complementary" 
                    aria-label="Activity description"
                >
                    <div className="font-medium">{ACTIVITY_CARD_TEXTS.DESCRIPTION}</div>
                    <span className="whitespace-pre-wrap">{activity.description}</span>
                </section>

                <hr className="border-gray-200 border-dotted" />

                <footer className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <span className="text-sm text-gray-500 flex items-center gap-2">
                            {activity.createdBy}
                            <time dateTime={activity.createdOn}>{getFormattedDate(activity.createdOn)}</time>
                        </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-500">
                        {ACTIVITY_CARD_TEXTS.ACTIVITY_NUMBER}{index + 1}
                    </span>
                </footer>
            </article>
            <EditModal 
                isOpen={isUpdateModalOpen} 
                onClose={() => setIsUpdateModalOpen(false)} 
                type="activity" 
                title={activity.title} 
            >
                <ActivityForm 
                    onSubmit={handleUpdateActivity} 
                    initialData={{
                        title: activity.title,
                        description: activity.description
                    }}
                    isEditing={true}
                    onClose={() => setIsUpdateModalOpen(false)}
                />
            </EditModal>
            <DeleteModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onDelete={() => handleDeleteActivity(activity.id)} 
                type="activity" 
                title={activity.title} 
            />
        </>
    );
};

export default ActivityCard;