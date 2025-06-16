import { EventParser, Idl, Program } from '@coral-xyz/anchor';

export function logsToEvents<T extends Idl>(
    program: Program<T>,
    logs: string[],
    walletPk: string,
): {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: any;
    walletPk: string;
}[] {
    const parser = new EventParser(program.programId, program.coder);
    const errors = parser.parseLogs(logs);
    return [...errors].map(event => ({ event, walletPk }));
}
