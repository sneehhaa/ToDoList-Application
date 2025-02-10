import React from "react";

export interface Task {
    id: string;
    name: string;
    done: boolean;
    createdAt: Date;
    deletedAt?: Date | string | null;
}