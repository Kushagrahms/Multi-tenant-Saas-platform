type StatCardProps = {
    title: string;
    value: number| string;
};
const StatCard = ({title,value}:StatCardProps) =>{
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-orange-100">
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-800">{value}</h2>
        </div>
    );
};

export default StatCard;
