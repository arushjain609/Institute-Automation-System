import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";

// Helper components for each tab (reuse HostelTransfer style)
const PendingRequests = ({ requests, handleAction }) => {
    if (requests.length === 0) {
        return (
            <div className="card bg-base-100 shadow border border-base-200 rounded-lg text-center text-gray-500 py-4">
                No pending requests.
            </div>
        );
    }
    return (
        <div className="card bg-base-100 shadow border border-base-200 p-6 rounded-lg">
            {requests.map((req) => (
                <div key={req.id || req._id} className="border rounded-lg shadow-sm mb-4 p-4 bg-yellow-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 384 512" className="w-5 h-5 text-indigo-600"><path d="M336 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM144 32h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm48 128c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H102.4C90 416 80 407.4 80 396.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Application Id</div>
                                <div className="text-sm font-semibold text-gray-800">{req.id}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 384 512" className="w-5 h-5 text-indigo-600"><path d="M336 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM144 32h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm48 128c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H102.4C90 416 80 407.4 80 396.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Student ID</div>
                                <div className="text-sm font-semibold text-gray-800">{req.studentId}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 576 512" className="w-5 h-5 text-indigo-600"><path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Start Date</div>
                                <div className="text-sm font-semibold text-gray-800">
                                    {req.startDate ? new Date(req.startDate).toLocaleDateString() : ''}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 576 512" className="w-5 h-5 text-indigo-600"><path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">End Date</div>
                                <div className="text-sm font-semibold text-gray-800">
                                    {req.endDate ? new Date(req.endDate).toLocaleDateString() : ''}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 576 512" className="w-5 h-5 text-indigo-600"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" /></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Reason</div>
                                <div className="text-sm font-semibold text-gray-800">{req.reason}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-left mt-2">
                        <button
                            onClick={() => handleAction(req.id, "Approved")}
                            className="bg-green-500 max-h-10 shadow-sm text-white px-3 py-2 rounded mr-4 hover:scale-105 transition duration-200"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => handleAction(req.id, "Rejected")}
                            className="bg-red-500 max-h-10 shadow-sm text-white px-4 py-2 rounded hover:scale-105 transition duration-200"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ApprovedRequests = ({ requests }) => {
    if (requests.length === 0) {
        return (
            <div className="card bg-base-100 shadow border border-base-200 rounded-lg text-center text-gray-500 py-4">
                No approved requests.
            </div>
        );
    }
    return (
        <div className="card bg-base-100 shadow border border-base-200 p-6 rounded-lg">
            {requests.map((req) => (
                <div key={req.id || req._id} className="border rounded-lg shadow-sm mb-4 p-4 bg-green-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 384 512" className="w-5 h-5 text-indigo-600"><path d="M336 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM144 32h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm48 128c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H102.4C90 416 80 407.4 80 396.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Application Id</div>
                                <div className="text-sm font-semibold text-gray-800">{req.id}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 384 512" className="w-5 h-5 text-indigo-600"><path d="M336 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM144 32h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm48 128c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H102.4C90 416 80 407.4 80 396.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Student ID</div>
                                <div className="text-sm font-semibold text-gray-800">{req.studentId}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 576 512" className="w-5 h-5 text-indigo-600"><path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Start Date</div>
                                <div className="text-sm font-semibold text-gray-800">
                                    {req.startDate ? new Date(req.startDate).toLocaleDateString() : ''}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 576 512" className="w-5 h-5 text-indigo-600"><path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">End Date</div>
                                <div className="text-sm font-semibold text-gray-800">
                                    {req.endDate ? new Date(req.endDate).toLocaleDateString() : ''}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 576 512" className="w-5 h-5 text-indigo-600"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" /></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Reason</div>
                                <div className="text-sm font-semibold text-gray-800">{req.reason}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const RejectedRequests = ({ requests }) => {
    if (requests.length === 0) {
        return (
            <div className="card bg-base-100 shadow border border-base-200 rounded-lg text-center text-gray-500 py-4">
                No rejected requests.
            </div>
        );
    }
    return (
        <div className="card bg-base-100 shadow border border-base-200 p-6 rounded-lg">
            {requests.map((req) => (
                <div key={req.id || req._id} className="border rounded-lg shadow-sm mb-4 p-4 bg-red-50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 384 512" className="w-5 h-5 text-indigo-600"><path d="M336 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM144 32h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm48 128c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H102.4C90 416 80 407.4 80 396.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Application Id</div>
                                <div className="text-sm font-semibold text-gray-800">{req.id}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 384 512" className="w-5 h-5 text-indigo-600"><path d="M336 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM144 32h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm48 128c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H102.4C90 416 80 407.4 80 396.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Student ID</div>
                                <div className="text-sm font-semibold text-gray-800">{req.studentId}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 576 512" className="w-5 h-5 text-indigo-600"><path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Start Date</div>
                                <div className="text-sm font-semibold text-gray-800">
                                    {req.startDate ? new Date(req.startDate).toLocaleDateString() : ''}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 576 512" className="w-5 h-5 text-indigo-600"><path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0z"></path></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">End Date</div>
                                <div className="text-sm font-semibold text-gray-800">
                                    {req.endDate ? new Date(req.endDate).toLocaleDateString() : ''}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200 shadow-sm">
                                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 576 512" className="w-5 h-5 text-indigo-600"><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" /></svg>
                            </div>
                            <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">Reason</div>
                                <div className="text-sm font-semibold text-gray-800">{req.reason}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

function adjustNoonDate(dateString) {
    const d = new Date(dateString);
    d.setHours(d.getHours() + 12);
    return d.toLocaleDateString();
}

const HostelLeaveAdmin = () => {
    const [requests, setRequests] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');

    const { isLoading, error, data } = useQuery({
        queryKey: ["leaves"],
        queryFn: () =>
            newRequest.get(`/hostel/leaves`).then((res) => res.data),
    });

    useEffect(() => {
        if (!isLoading && !error && data) {
            setRequests(data.map(item => ({
                id: item._id,
                studentId: item.rollNo,
                startDate: item.startDate,
                endDate: item.endDate,
                reason: item.reason,
                status: item.status
            })));
        }
    }, [data, isLoading, error]);

    useEffect(() => {
        setPendingRequests(requests.filter(req => req.status === 'Pending'));
        setApprovedRequests(requests.filter(req => req.status === 'Approved'));
        setRejectedRequests(requests.filter(req => req.status === 'Rejected'));
    }, [requests]);

    const handleAction = (id, newStatus) => {
        setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
        newRequest.put(`/hostel/leaves/${id}`, { status: newStatus })
            .then(() => {
            })
            .catch(() => {
                setRequests(requests); // revert on error
            });
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center mt-3">
            {/* Add a gap between navbar and main content */}
            <div className="mt-10 max-w-3xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Leave Requests</h2>
                <hr className="border-gray-300 mb-4 w-full" />
                <div className="flex justify-around mb-6 p-1 space-x-1">
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`flex items-center px-5 py-2.5 shadow rounded-md text-sm font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 ${activeTab === 'pending' ? 'bg-indigo-700' : 'bg-gray-200'} ${activeTab === 'pending' ? 'text-white' : 'text-indigo-700'}`}
                        style={activeTab === 'pending' ? { color: '#fff', fontWeight: 600 } : {}}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setActiveTab('approved')}
                        className={`flex items-center px-5 py-2.5 shadow rounded-md text-sm font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 ${activeTab === 'approved' ? 'bg-indigo-700' : 'bg-gray-200'} ${activeTab === 'approved' ? 'text-white' : 'text-indigo-700'}`}
                        style={activeTab === 'approved' ? { color: '#fff', fontWeight: 600 } : {}}
                    >
                        Approved
                    </button>
                    <button
                        onClick={() => setActiveTab('rejected')}
                        className={`flex items-center px-5 py-2.5 shadow rounded-md text-sm font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 ${activeTab === 'rejected' ? 'bg-indigo-700' : 'bg-gray-200'} ${activeTab === 'rejected' ? 'text-white' : 'text-indigo-700'}`}
                        style={activeTab === 'rejected' ? { color: '#fff', fontWeight: 600 } : {}}
                    >
                        Rejected
                    </button>
                </div>

                {activeTab === 'pending' && (
                    <PendingRequests requests={pendingRequests} handleAction={handleAction} />
                )}
                {activeTab === 'approved' && (
                    <ApprovedRequests requests={approvedRequests} />
                )}
                {activeTab === 'rejected' && (
                    <RejectedRequests requests={rejectedRequests} />
                )}
            </div>
        </div>
    );
};

export default HostelLeaveAdmin;