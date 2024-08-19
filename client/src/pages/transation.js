import React, { useState, useEffect } from "react";

export default function Transaction() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <div>
            <div className="m-4">
                {user && (
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">User Information</h5>
                            <p className="card-text"><strong>Email:</strong> {user.email}</p>
                            <p className="card-text"><strong>UPI ID:</strong> {user.upi_id}</p>
                            <p className="card-text"><strong>Balance:</strong> {user.balance}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="m-4">
            <h1>Initiate Transaction</h1>
            </div>

            <div className="m-4">
            <h1>Transaction History</h1>
            </div>


        </div>
    );
}
