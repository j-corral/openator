import { ManagerAgentAction } from '@/core/agents/openator/openator.types';
export type TaskStatus = 'pending' | 'completed' | 'failed' | 'cancelled' | 'running';
export type TaskActionStatus = 'pending' | 'completed' | 'cancelled' | 'failed' | 'running';
export declare class TaskAction {
    readonly data: ManagerAgentAction;
    readonly id: string;
    private _reason;
    private _status;
    result: string;
    constructor(data: ManagerAgentAction);
    get status(): TaskActionStatus;
    start(): void;
    complete(result?: string): void;
    cancel(reason: string): void;
    fail(reason: string): void;
    asObject(): {
        id: string;
        status: TaskActionStatus;
        reason: string;
        name: "extractContent" | "clickElement" | "fillInput" | "goBack" | "scrollDown" | "scrollUp" | "goToUrl" | "takeScreenshot" | "triggerResult";
        params: {
            index?: number;
        } | {
            index?: number;
            text?: string;
        } | {
            url?: string;
        } | {
            data?: string;
        };
        description: string;
    };
    objectForLLM(): {
        description: string;
        status: TaskActionStatus;
        result: string;
        reason: string;
    };
}
export declare class Task {
    readonly id: string;
    readonly goal: string;
    readonly actions: TaskAction[];
    private _status;
    private _reason;
    constructor(id: string, goal: string, actions: TaskAction[], _status: TaskStatus, _reason?: string | undefined);
    static InitPending(goal: string, actions: ManagerAgentAction[]): Task;
    get status(): TaskStatus;
    get reason(): string;
    get pendingActions(): TaskAction[];
    get nextPendingAction(): TaskAction | null;
    completeAction(id: string): void;
    cancelAction(id: string, reason: string): void;
    start(): void;
    complete(): void;
    cancel(reason: string): void;
    fail(reason: string): void;
    objectForLLM(): {
        goal: string;
        actionsTaken: {
            description: string;
            status: TaskActionStatus;
            result: string;
            reason: string;
        }[];
    };
    serialize(): string;
    asObject(): {
        id: string;
        goal: string;
        actions: {
            id: string;
            status: TaskActionStatus;
            reason: string;
            name: "extractContent" | "clickElement" | "fillInput" | "goBack" | "scrollDown" | "scrollUp" | "goToUrl" | "takeScreenshot" | "triggerResult";
            params: {
                index?: number;
            } | {
                index?: number;
                text?: string;
            } | {
                url?: string;
            } | {
                data?: string;
            };
            description: string;
        }[];
        status: TaskStatus;
        reason: string;
    };
}
