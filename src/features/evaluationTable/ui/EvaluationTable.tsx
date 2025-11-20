import { useMemo, useState } from "react";
import { NavLink } from 'react-router-dom';
import { EvaluationResponseModel, EvaluationWithGoalsResponseModel, FeedbackEnum, getFeedbackText, useGetEvaluations } from "~/entities";
import { PageRequestModel, ROUTES, Table, useAppStore } from "~/shared";
import { ViewIcon } from "../assets";
import { EVALUATION_TABLE_TEXTS } from "../constants";

interface EvaluationTableProps {
    userDepartmentId: number,
    yearSelected: number,
    searchTermTyped: string
}

const EvaluationTable: React.FC<EvaluationTableProps> = ({userDepartmentId, yearSelected, searchTermTyped}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { setEvaluationSelected } = useAppStore();

  const pageRequest = PageRequestModel.create({
    page: pageNumber,
    pageSize: pageSize,
    searchTerm: searchTermTyped,
    sortBy: sortBy,
    sortDirection: sortDirection,
    year: yearSelected,
    departmentId: userDepartmentId,
  });

  const { data, isLoading } = useGetEvaluations(pageRequest);

  const handleSortChange = (newSortBy: string, newSortDirection: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortDirection(newSortDirection);
    setPageNumber(1);
  };

  const memorizedData = useMemo(() => {
    const evaluationData = data?.items || [];
    if(!evaluationData) return [];
    return [...evaluationData]
  }, [data]);

  const columns = useMemo(() => {
    return [
        {
            header: 'EmployeeId',
            accessor: 'employeeId' as keyof EvaluationResponseModel,
            render: (row: EvaluationResponseModel) => row.employeeId.toString(),
        },
        {
            header: 'Fullname',
            accessor: 'employeeFullName' as keyof EvaluationResponseModel,
            render: (row: EvaluationResponseModel) => row.employeeFullName.toString(),
        },
        {
          header: 'Goals Feedback',
          accessor: 'feedback' as keyof EvaluationResponseModel,
          render: (row: EvaluationResponseModel) => getFeedbackText(row.feedback ?? FeedbackEnum.Outstanding) || '',
      },
        {
            header: 'View',
            accessor: 'year' as keyof EvaluationResponseModel,
            render: (row: EvaluationResponseModel) => (
              <div className="flex justify-center items-center">
                <NavLink 
                  to={ROUTES.GOALS.replace(':id', row.employeeId.toString())}
                  state={{ fromApp: true }}
                  title={EVALUATION_TABLE_TEXTS.VIEW_EVALUATION}
                  onClick={() => {
                    setEvaluationSelected(EvaluationWithGoalsResponseModel.create({
                      ...row,
                      goals: []
                    }));
                  }}
                >
                  <ViewIcon />
                </NavLink>
              </div>
            ),
        },
    ]
  }, [setEvaluationSelected]);

  return (
    <>
        <Table
            columns={columns}
            isLoading={isLoading}
            data={memorizedData}
            totalPages={data?.totalPages || 0}
            currentPage={pageNumber}
            pageSize={pageSize}
            onPageChange={(newPage) => setPageNumber(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortChange={handleSortChange}
          />
    </>
  );
};

export default EvaluationTable;
