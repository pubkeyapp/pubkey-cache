export type VoterStakeRegistry = {
    accounts: [
        {
            name: 'registrar';
            type: {
                fields: [
                    {
                        name: 'governanceProgramId';
                        type: 'publicKey';
                    },
                    {
                        name: 'realm';
                        type: 'publicKey';
                    },
                    {
                        name: 'realmGoverningTokenMint';
                        type: 'publicKey';
                    },
                    {
                        name: 'realmAuthority';
                        type: 'publicKey';
                    },
                    {
                        name: 'reserved1';
                        type: {
                            array: ['u8', 32];
                        };
                    },
                    {
                        name: 'votingMints';
                        type: {
                            array: [
                                {
                                    defined: 'VotingMintConfig';
                                },
                                4,
                            ];
                        };
                    },
                    {
                        name: 'timeOffset';
                        type: 'i64';
                    },
                    {
                        name: 'bump';
                        type: 'u8';
                    },
                    {
                        name: 'reserved2';
                        type: {
                            array: ['u8', 7];
                        };
                    },
                    {
                        name: 'reserved3';
                        type: {
                            array: ['u64', 11];
                        };
                    },
                ];
                kind: 'struct';
            };
        },
        {
            name: 'voter';
            type: {
                fields: [
                    {
                        name: 'voterAuthority';
                        type: 'publicKey';
                    },
                    {
                        name: 'registrar';
                        type: 'publicKey';
                    },
                    {
                        name: 'deposits';
                        type: {
                            array: [
                                {
                                    defined: 'DepositEntry';
                                },
                                32,
                            ];
                        };
                    },
                    {
                        name: 'voterBump';
                        type: 'u8';
                    },
                    {
                        name: 'voterWeightRecordBump';
                        type: 'u8';
                    },
                    {
                        name: 'reserved';
                        type: {
                            array: ['u8', 94];
                        };
                    },
                ];
                kind: 'struct';
            };
        },
    ];
    errors: [
        {
            code: 6000;
            msg: 'Exchange rate must be greater than zero';
            name: 'InvalidRate';
        },
        {
            code: 6001;
            msg: '';
            name: 'RatesFull';
        },
        {
            code: 6002;
            msg: '';
            name: 'VotingMintNotFound';
        },
        {
            code: 6003;
            msg: '';
            name: 'DepositEntryNotFound';
        },
        {
            code: 6004;
            msg: '';
            name: 'DepositEntryFull';
        },
        {
            code: 6005;
            msg: '';
            name: 'VotingTokenNonZero';
        },
        {
            code: 6006;
            msg: '';
            name: 'OutOfBoundsDepositEntryIndex';
        },
        {
            code: 6007;
            msg: '';
            name: 'UnusedDepositEntryIndex';
        },
        {
            code: 6008;
            msg: '';
            name: 'InsufficientUnlockedTokens';
        },
        {
            code: 6009;
            msg: '';
            name: 'UnableToConvert';
        },
        {
            code: 6010;
            msg: '';
            name: 'InvalidLockupPeriod';
        },
        {
            code: 6011;
            msg: '';
            name: 'InvalidEndTs';
        },
        {
            code: 6012;
            msg: '';
            name: 'InvalidDays';
        },
        {
            code: 6013;
            msg: '';
            name: 'VotingMintConfigIndexAlreadyInUse';
        },
        {
            code: 6014;
            msg: '';
            name: 'OutOfBoundsVotingMintConfigIndex';
        },
        {
            code: 6015;
            msg: 'Exchange rate decimals cannot be larger than registrar decimals';
            name: 'InvalidDecimals';
        },
        {
            code: 6016;
            msg: '';
            name: 'InvalidToDepositAndWithdrawInOneSlot';
        },
        {
            code: 6017;
            msg: '';
            name: 'ShouldBeTheFirstIxInATx';
        },
        {
            code: 6018;
            msg: '';
            name: 'ForbiddenCpi';
        },
        {
            code: 6019;
            msg: '';
            name: 'InvalidMint';
        },
        {
            code: 6020;
            msg: '';
            name: 'DebugInstruction';
        },
        {
            code: 6021;
            msg: '';
            name: 'ClawbackNotAllowedOnDeposit';
        },
        {
            code: 6022;
            msg: '';
            name: 'DepositStillLocked';
        },
        {
            code: 6023;
            msg: '';
            name: 'InvalidAuthority';
        },
        {
            code: 6024;
            msg: '';
            name: 'InvalidTokenOwnerRecord';
        },
        {
            code: 6025;
            msg: '';
            name: 'InvalidRealmAuthority';
        },
        {
            code: 6026;
            msg: '';
            name: 'VoterWeightOverflow';
        },
        {
            code: 6027;
            msg: '';
            name: 'LockupSaturationMustBePositive';
        },
        {
            code: 6028;
            msg: '';
            name: 'VotingMintConfiguredWithDifferentIndex';
        },
        {
            code: 6029;
            msg: '';
            name: 'InternalProgramError';
        },
        {
            code: 6030;
            msg: '';
            name: 'InsufficientLockedTokens';
        },
        {
            code: 6031;
            msg: '';
            name: 'MustKeepTokensLocked';
        },
        {
            code: 6032;
            msg: '';
            name: 'InvalidLockupKind';
        },
        {
            code: 6033;
            msg: '';
            name: 'InvalidChangeToClawbackDepositEntry';
        },
        {
            code: 6034;
            msg: '';
            name: 'InternalErrorBadLockupVoteWeight';
        },
        {
            code: 6035;
            msg: '';
            name: 'DepositStartTooFarInFuture';
        },
        {
            code: 6036;
            msg: '';
            name: 'VaultTokenNonZero';
        },
        {
            code: 6037;
            msg: '';
            name: 'InvalidTimestampArguments';
        },
    ];
    events: [
        {
            fields: [
                {
                    index: false;
                    name: 'votingPower';
                    type: 'u64';
                },
                {
                    index: false;
                    name: 'votingPowerBaseline';
                    type: 'u64';
                },
            ];
            name: 'VoterInfo';
        },
        {
            fields: [
                {
                    index: false;
                    name: 'depositEntryIndex';
                    type: 'u8';
                },
                {
                    index: false;
                    name: 'votingMintConfigIndex';
                    type: 'u8';
                },
                {
                    index: false;
                    name: 'unlocked';
                    type: 'u64';
                },
                {
                    index: false;
                    name: 'votingPower';
                    type: 'u64';
                },
                {
                    index: false;
                    name: 'votingPowerBaseline';
                    type: 'u64';
                },
                {
                    index: false;
                    name: 'locking';
                    type: {
                        option: {
                            defined: 'LockingInfo';
                        };
                    };
                },
            ];
            name: 'DepositEntryInfo';
        },
    ];
    instructions: [
        {
            accounts: [
                {
                    isMut: true;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'realm';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'governanceProgramId';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'realmGoverningTokenMint';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'realmAuthority';
                },
                {
                    isMut: true;
                    isSigner: true;
                    name: 'payer';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'systemProgram';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'rent';
                },
            ];
            args: [
                {
                    name: 'registrarBump';
                    type: 'u8';
                },
            ];
            name: 'createRegistrar';
        },
        {
            accounts: [
                {
                    isMut: true;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'realmAuthority';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'mint';
                },
            ];
            args: [
                {
                    name: 'idx';
                    type: 'u16';
                },
                {
                    name: 'digitShift';
                    type: 'i8';
                },
                {
                    name: 'baselineVoteWeightScaledFactor';
                    type: 'u64';
                },
                {
                    name: 'maxExtraLockupVoteWeightScaledFactor';
                    type: 'u64';
                },
                {
                    name: 'lockupSaturationSecs';
                    type: 'u64';
                },
                {
                    name: 'grantAuthority';
                    type: {
                        option: 'publicKey';
                    };
                },
            ];
            name: 'configureVotingMint';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'voterAuthority';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voterWeightRecord';
                },
                {
                    isMut: true;
                    isSigner: true;
                    name: 'payer';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'systemProgram';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'rent';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'instructions';
                },
            ];
            args: [
                {
                    name: 'voterBump';
                    type: 'u8';
                },
                {
                    name: 'voterWeightRecordBump';
                    type: 'u8';
                },
            ];
            name: 'createVoter';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'vault';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'voterAuthority';
                },
                {
                    isMut: true;
                    isSigner: true;
                    name: 'payer';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'depositMint';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'systemProgram';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'tokenProgram';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'associatedTokenProgram';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'rent';
                },
            ];
            args: [
                {
                    name: 'depositEntryIndex';
                    type: 'u8';
                },
                {
                    name: 'kind';
                    type: {
                        defined: 'LockupKind';
                    };
                },
                {
                    name: 'startTs';
                    type: {
                        option: 'u64';
                    };
                },
                {
                    name: 'periods';
                    type: 'u32';
                },
                {
                    name: 'allowClawback';
                    type: 'bool';
                },
            ];
            name: 'createDepositEntry';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'vault';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'depositToken';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'depositAuthority';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'tokenProgram';
                },
            ];
            args: [
                {
                    name: 'depositEntryIndex';
                    type: 'u8';
                },
                {
                    name: 'amount';
                    type: 'u64';
                },
            ];
            name: 'deposit';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'voterAuthority';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'tokenOwnerRecord';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voterWeightRecord';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'vault';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'destination';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'tokenProgram';
                },
            ];
            args: [
                {
                    name: 'depositEntryIndex';
                    type: 'u8';
                },
                {
                    name: 'amount';
                    type: 'u64';
                },
            ];
            name: 'withdraw';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'voterAuthority';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voterWeightRecord';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'vault';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'depositToken';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'tokenAuthority';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'grantAuthority';
                },
                {
                    isMut: true;
                    isSigner: true;
                    name: 'payer';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'depositMint';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'systemProgram';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'tokenProgram';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'associatedTokenProgram';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'rent';
                },
            ];
            args: [
                {
                    name: 'voterBump';
                    type: 'u8';
                },
                {
                    name: 'voterWeightRecordBump';
                    type: 'u8';
                },
                {
                    name: 'kind';
                    type: {
                        defined: 'LockupKind';
                    };
                },
                {
                    name: 'startTs';
                    type: {
                        option: 'u64';
                    };
                },
                {
                    name: 'periods';
                    type: 'u32';
                },
                {
                    name: 'allowClawback';
                    type: 'bool';
                },
                {
                    name: 'amount';
                    type: 'u64';
                },
            ];
            name: 'grant';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'realmAuthority';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'vault';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'destination';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'tokenProgram';
                },
            ];
            args: [
                {
                    name: 'depositEntryIndex';
                    type: 'u8';
                },
            ];
            name: 'clawback';
        },
        {
            accounts: [
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'voterAuthority';
                },
            ];
            args: [
                {
                    name: 'depositEntryIndex';
                    type: 'u8';
                },
            ];
            name: 'closeDepositEntry';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'voterAuthority';
                },
            ];
            args: [
                {
                    name: 'depositEntryIndex';
                    type: 'u8';
                },
                {
                    name: 'kind';
                    type: {
                        defined: 'LockupKind';
                    };
                },
                {
                    name: 'periods';
                    type: 'u32';
                },
            ];
            name: 'resetLockup';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'voterAuthority';
                },
            ];
            args: [
                {
                    name: 'sourceDepositEntryIndex';
                    type: 'u8';
                },
                {
                    name: 'targetDepositEntryIndex';
                    type: 'u8';
                },
                {
                    name: 'amount';
                    type: 'u64';
                },
            ];
            name: 'internalTransferLocked';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'voterAuthority';
                },
            ];
            args: [
                {
                    name: 'sourceDepositEntryIndex';
                    type: 'u8';
                },
                {
                    name: 'targetDepositEntryIndex';
                    type: 'u8';
                },
                {
                    name: 'amount';
                    type: 'u64';
                },
            ];
            name: 'internalTransferUnlocked';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voterWeightRecord';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'systemProgram';
                },
            ];
            args: [];
            name: 'updateVoterWeightRecord';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'maxVoteWeightRecord';
                },
            ];
            args: [];
            name: 'updateMaxVoteWeight';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'voter';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'voterAuthority';
                },
                {
                    isMut: true;
                    isSigner: false;
                    name: 'solDestination';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'tokenProgram';
                },
            ];
            args: [];
            name: 'closeVoter';
        },
        {
            accounts: [
                {
                    isMut: false;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: false;
                    isSigner: false;
                    name: 'voter';
                },
            ];
            args: [
                {
                    name: 'depositEntryBegin';
                    type: 'u8';
                },
                {
                    name: 'depositEntryCount';
                    type: 'u8';
                },
            ];
            name: 'logVoterInfo';
        },
        {
            accounts: [
                {
                    isMut: true;
                    isSigner: false;
                    name: 'registrar';
                },
                {
                    isMut: false;
                    isSigner: true;
                    name: 'realmAuthority';
                },
            ];
            args: [
                {
                    name: 'timeOffset';
                    type: 'i64';
                },
            ];
            name: 'setTimeOffset';
        },
    ];
    name: 'voter_stake_registry';
    types: [
        {
            name: 'VestingInfo';
            type: {
                fields: [
                    {
                        name: 'rate';
                        type: 'u64';
                    },
                    {
                        name: 'nextTimestamp';
                        type: 'u64';
                    },
                ];
                kind: 'struct';
            };
        },
        {
            name: 'LockingInfo';
            type: {
                fields: [
                    {
                        name: 'amount';
                        type: 'u64';
                    },
                    {
                        name: 'endTimestamp';
                        type: {
                            option: 'u64';
                        };
                    },
                    {
                        name: 'vesting';
                        type: {
                            option: {
                                defined: 'VestingInfo';
                            };
                        };
                    },
                ];
                kind: 'struct';
            };
        },
        {
            name: 'DepositEntry';
            type: {
                fields: [
                    {
                        name: 'lockup';
                        type: {
                            defined: 'Lockup';
                        };
                    },
                    {
                        name: 'amountDepositedNative';
                        type: 'u64';
                    },
                    {
                        name: 'amountInitiallyLockedNative';
                        type: 'u64';
                    },
                    {
                        name: 'isUsed';
                        type: 'bool';
                    },
                    {
                        name: 'allowClawback';
                        type: 'bool';
                    },
                    {
                        name: 'votingMintConfigIdx';
                        type: 'u8';
                    },
                    {
                        name: 'reserved';
                        type: {
                            array: ['u8', 29];
                        };
                    },
                ];
                kind: 'struct';
            };
        },
        {
            name: 'Lockup';
            type: {
                fields: [
                    {
                        name: 'startTs';
                        type: 'i64';
                    },
                    {
                        name: 'endTs';
                        type: 'i64';
                    },
                    {
                        name: 'kind';
                        type: {
                            defined: 'LockupKind';
                        };
                    },
                    {
                        name: 'reserved';
                        type: {
                            array: ['u8', 15];
                        };
                    },
                ];
                kind: 'struct';
            };
        },
        {
            name: 'VotingMintConfig';
            type: {
                fields: [
                    {
                        name: 'mint';
                        type: 'publicKey';
                    },
                    {
                        name: 'grantAuthority';
                        type: 'publicKey';
                    },
                    {
                        name: 'baselineVoteWeightScaledFactor';
                        type: 'u64';
                    },
                    {
                        name: 'maxExtraLockupVoteWeightScaledFactor';
                        type: 'u64';
                    },
                    {
                        name: 'lockupSaturationSecs';
                        type: 'u64';
                    },
                    {
                        name: 'digitShift';
                        type: 'i8';
                    },
                    {
                        name: 'reserved1';
                        type: {
                            array: ['u8', 7];
                        };
                    },
                    {
                        name: 'reserved2';
                        type: {
                            array: ['u64', 7];
                        };
                    },
                ];
                kind: 'struct';
            };
        },
        {
            name: 'LockupKind';
            type: {
                kind: 'enum';
                variants: [
                    {
                        name: 'None';
                    },
                    {
                        name: 'Daily';
                    },
                    {
                        name: 'Monthly';
                    },
                    {
                        name: 'Cliff';
                    },
                    {
                        name: 'Constant';
                    },
                ];
            };
        },
    ];
    version: '0.2.4';
};

export const IDL: VoterStakeRegistry = {
    accounts: [
        {
            name: 'registrar',
            type: {
                fields: [
                    {
                        name: 'governanceProgramId',
                        type: 'publicKey',
                    },
                    {
                        name: 'realm',
                        type: 'publicKey',
                    },
                    {
                        name: 'realmGoverningTokenMint',
                        type: 'publicKey',
                    },
                    {
                        name: 'realmAuthority',
                        type: 'publicKey',
                    },
                    {
                        name: 'reserved1',
                        type: {
                            array: ['u8', 32],
                        },
                    },
                    {
                        name: 'votingMints',
                        type: {
                            array: [
                                {
                                    defined: 'VotingMintConfig',
                                },
                                4,
                            ],
                        },
                    },
                    {
                        name: 'timeOffset',
                        type: 'i64',
                    },
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'reserved2',
                        type: {
                            array: ['u8', 7],
                        },
                    },
                    {
                        name: 'reserved3',
                        type: {
                            array: ['u64', 11],
                        },
                    },
                ],
                kind: 'struct',
            },
        },
        {
            name: 'voter',
            type: {
                fields: [
                    {
                        name: 'voterAuthority',
                        type: 'publicKey',
                    },
                    {
                        name: 'registrar',
                        type: 'publicKey',
                    },
                    {
                        name: 'deposits',
                        type: {
                            array: [
                                {
                                    defined: 'DepositEntry',
                                },
                                32,
                            ],
                        },
                    },
                    {
                        name: 'voterBump',
                        type: 'u8',
                    },
                    {
                        name: 'voterWeightRecordBump',
                        type: 'u8',
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: ['u8', 94],
                        },
                    },
                ],
                kind: 'struct',
            },
        },
    ],
    errors: [
        {
            code: 6000,
            msg: 'Exchange rate must be greater than zero',
            name: 'InvalidRate',
        },
        {
            code: 6001,
            msg: '',
            name: 'RatesFull',
        },
        {
            code: 6002,
            msg: '',
            name: 'VotingMintNotFound',
        },
        {
            code: 6003,
            msg: '',
            name: 'DepositEntryNotFound',
        },
        {
            code: 6004,
            msg: '',
            name: 'DepositEntryFull',
        },
        {
            code: 6005,
            msg: '',
            name: 'VotingTokenNonZero',
        },
        {
            code: 6006,
            msg: '',
            name: 'OutOfBoundsDepositEntryIndex',
        },
        {
            code: 6007,
            msg: '',
            name: 'UnusedDepositEntryIndex',
        },
        {
            code: 6008,
            msg: '',
            name: 'InsufficientUnlockedTokens',
        },
        {
            code: 6009,
            msg: '',
            name: 'UnableToConvert',
        },
        {
            code: 6010,
            msg: '',
            name: 'InvalidLockupPeriod',
        },
        {
            code: 6011,
            msg: '',
            name: 'InvalidEndTs',
        },
        {
            code: 6012,
            msg: '',
            name: 'InvalidDays',
        },
        {
            code: 6013,
            msg: '',
            name: 'VotingMintConfigIndexAlreadyInUse',
        },
        {
            code: 6014,
            msg: '',
            name: 'OutOfBoundsVotingMintConfigIndex',
        },
        {
            code: 6015,
            msg: 'Exchange rate decimals cannot be larger than registrar decimals',
            name: 'InvalidDecimals',
        },
        {
            code: 6016,
            msg: '',
            name: 'InvalidToDepositAndWithdrawInOneSlot',
        },
        {
            code: 6017,
            msg: '',
            name: 'ShouldBeTheFirstIxInATx',
        },
        {
            code: 6018,
            msg: '',
            name: 'ForbiddenCpi',
        },
        {
            code: 6019,
            msg: '',
            name: 'InvalidMint',
        },
        {
            code: 6020,
            msg: '',
            name: 'DebugInstruction',
        },
        {
            code: 6021,
            msg: '',
            name: 'ClawbackNotAllowedOnDeposit',
        },
        {
            code: 6022,
            msg: '',
            name: 'DepositStillLocked',
        },
        {
            code: 6023,
            msg: '',
            name: 'InvalidAuthority',
        },
        {
            code: 6024,
            msg: '',
            name: 'InvalidTokenOwnerRecord',
        },
        {
            code: 6025,
            msg: '',
            name: 'InvalidRealmAuthority',
        },
        {
            code: 6026,
            msg: '',
            name: 'VoterWeightOverflow',
        },
        {
            code: 6027,
            msg: '',
            name: 'LockupSaturationMustBePositive',
        },
        {
            code: 6028,
            msg: '',
            name: 'VotingMintConfiguredWithDifferentIndex',
        },
        {
            code: 6029,
            msg: '',
            name: 'InternalProgramError',
        },
        {
            code: 6030,
            msg: '',
            name: 'InsufficientLockedTokens',
        },
        {
            code: 6031,
            msg: '',
            name: 'MustKeepTokensLocked',
        },
        {
            code: 6032,
            msg: '',
            name: 'InvalidLockupKind',
        },
        {
            code: 6033,
            msg: '',
            name: 'InvalidChangeToClawbackDepositEntry',
        },
        {
            code: 6034,
            msg: '',
            name: 'InternalErrorBadLockupVoteWeight',
        },
        {
            code: 6035,
            msg: '',
            name: 'DepositStartTooFarInFuture',
        },
        {
            code: 6036,
            msg: '',
            name: 'VaultTokenNonZero',
        },
        {
            code: 6037,
            msg: '',
            name: 'InvalidTimestampArguments',
        },
    ],
    events: [
        {
            fields: [
                {
                    index: false,
                    name: 'votingPower',
                    type: 'u64',
                },
                {
                    index: false,
                    name: 'votingPowerBaseline',
                    type: 'u64',
                },
            ],
            name: 'VoterInfo',
        },
        {
            fields: [
                {
                    index: false,
                    name: 'depositEntryIndex',
                    type: 'u8',
                },
                {
                    index: false,
                    name: 'votingMintConfigIndex',
                    type: 'u8',
                },
                {
                    index: false,
                    name: 'unlocked',
                    type: 'u64',
                },
                {
                    index: false,
                    name: 'votingPower',
                    type: 'u64',
                },
                {
                    index: false,
                    name: 'votingPowerBaseline',
                    type: 'u64',
                },
                {
                    index: false,
                    name: 'locking',
                    type: {
                        option: {
                            defined: 'LockingInfo',
                        },
                    },
                },
            ],
            name: 'DepositEntryInfo',
        },
    ],
    instructions: [
        {
            accounts: [
                {
                    isMut: true,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'realm',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'governanceProgramId',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'realmGoverningTokenMint',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'realmAuthority',
                },
                {
                    isMut: true,
                    isSigner: true,
                    name: 'payer',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'systemProgram',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'rent',
                },
            ],
            args: [
                {
                    name: 'registrarBump',
                    type: 'u8',
                },
            ],
            name: 'createRegistrar',
        },
        {
            accounts: [
                {
                    isMut: true,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'realmAuthority',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'mint',
                },
            ],
            args: [
                {
                    name: 'idx',
                    type: 'u16',
                },
                {
                    name: 'digitShift',
                    type: 'i8',
                },
                {
                    name: 'baselineVoteWeightScaledFactor',
                    type: 'u64',
                },
                {
                    name: 'maxExtraLockupVoteWeightScaledFactor',
                    type: 'u64',
                },
                {
                    name: 'lockupSaturationSecs',
                    type: 'u64',
                },
                {
                    name: 'grantAuthority',
                    type: {
                        option: 'publicKey',
                    },
                },
            ],
            name: 'configureVotingMint',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'voterAuthority',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voterWeightRecord',
                },
                {
                    isMut: true,
                    isSigner: true,
                    name: 'payer',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'systemProgram',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'rent',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'instructions',
                },
            ],
            args: [
                {
                    name: 'voterBump',
                    type: 'u8',
                },
                {
                    name: 'voterWeightRecordBump',
                    type: 'u8',
                },
            ],
            name: 'createVoter',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'vault',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'voterAuthority',
                },
                {
                    isMut: true,
                    isSigner: true,
                    name: 'payer',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'depositMint',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'systemProgram',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'tokenProgram',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'associatedTokenProgram',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'rent',
                },
            ],
            args: [
                {
                    name: 'depositEntryIndex',
                    type: 'u8',
                },
                {
                    name: 'kind',
                    type: {
                        defined: 'LockupKind',
                    },
                },
                {
                    name: 'startTs',
                    type: {
                        option: 'u64',
                    },
                },
                {
                    name: 'periods',
                    type: 'u32',
                },
                {
                    name: 'allowClawback',
                    type: 'bool',
                },
            ],
            name: 'createDepositEntry',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'vault',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'depositToken',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'depositAuthority',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'tokenProgram',
                },
            ],
            args: [
                {
                    name: 'depositEntryIndex',
                    type: 'u8',
                },
                {
                    name: 'amount',
                    type: 'u64',
                },
            ],
            name: 'deposit',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'voterAuthority',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'tokenOwnerRecord',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voterWeightRecord',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'vault',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'destination',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'tokenProgram',
                },
            ],
            args: [
                {
                    name: 'depositEntryIndex',
                    type: 'u8',
                },
                {
                    name: 'amount',
                    type: 'u64',
                },
            ],
            name: 'withdraw',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'voterAuthority',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voterWeightRecord',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'vault',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'depositToken',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'tokenAuthority',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'grantAuthority',
                },
                {
                    isMut: true,
                    isSigner: true,
                    name: 'payer',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'depositMint',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'systemProgram',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'tokenProgram',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'associatedTokenProgram',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'rent',
                },
            ],
            args: [
                {
                    name: 'voterBump',
                    type: 'u8',
                },
                {
                    name: 'voterWeightRecordBump',
                    type: 'u8',
                },
                {
                    name: 'kind',
                    type: {
                        defined: 'LockupKind',
                    },
                },
                {
                    name: 'startTs',
                    type: {
                        option: 'u64',
                    },
                },
                {
                    name: 'periods',
                    type: 'u32',
                },
                {
                    name: 'allowClawback',
                    type: 'bool',
                },
                {
                    name: 'amount',
                    type: 'u64',
                },
            ],
            name: 'grant',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'realmAuthority',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'vault',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'destination',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'tokenProgram',
                },
            ],
            args: [
                {
                    name: 'depositEntryIndex',
                    type: 'u8',
                },
            ],
            name: 'clawback',
        },
        {
            accounts: [
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'voterAuthority',
                },
            ],
            args: [
                {
                    name: 'depositEntryIndex',
                    type: 'u8',
                },
            ],
            name: 'closeDepositEntry',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'voterAuthority',
                },
            ],
            args: [
                {
                    name: 'depositEntryIndex',
                    type: 'u8',
                },
                {
                    name: 'kind',
                    type: {
                        defined: 'LockupKind',
                    },
                },
                {
                    name: 'periods',
                    type: 'u32',
                },
            ],
            name: 'resetLockup',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'voterAuthority',
                },
            ],
            args: [
                {
                    name: 'sourceDepositEntryIndex',
                    type: 'u8',
                },
                {
                    name: 'targetDepositEntryIndex',
                    type: 'u8',
                },
                {
                    name: 'amount',
                    type: 'u64',
                },
            ],
            name: 'internalTransferLocked',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'voterAuthority',
                },
            ],
            args: [
                {
                    name: 'sourceDepositEntryIndex',
                    type: 'u8',
                },
                {
                    name: 'targetDepositEntryIndex',
                    type: 'u8',
                },
                {
                    name: 'amount',
                    type: 'u64',
                },
            ],
            name: 'internalTransferUnlocked',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voterWeightRecord',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'systemProgram',
                },
            ],
            args: [],
            name: 'updateVoterWeightRecord',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'maxVoteWeightRecord',
                },
            ],
            args: [],
            name: 'updateMaxVoteWeight',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'voter',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'voterAuthority',
                },
                {
                    isMut: true,
                    isSigner: false,
                    name: 'solDestination',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'tokenProgram',
                },
            ],
            args: [],
            name: 'closeVoter',
        },
        {
            accounts: [
                {
                    isMut: false,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: false,
                    isSigner: false,
                    name: 'voter',
                },
            ],
            args: [
                {
                    name: 'depositEntryBegin',
                    type: 'u8',
                },
                {
                    name: 'depositEntryCount',
                    type: 'u8',
                },
            ],
            name: 'logVoterInfo',
        },
        {
            accounts: [
                {
                    isMut: true,
                    isSigner: false,
                    name: 'registrar',
                },
                {
                    isMut: false,
                    isSigner: true,
                    name: 'realmAuthority',
                },
            ],
            args: [
                {
                    name: 'timeOffset',
                    type: 'i64',
                },
            ],
            name: 'setTimeOffset',
        },
    ],
    name: 'voter_stake_registry',
    types: [
        {
            name: 'VestingInfo',
            type: {
                fields: [
                    {
                        name: 'rate',
                        type: 'u64',
                    },
                    {
                        name: 'nextTimestamp',
                        type: 'u64',
                    },
                ],
                kind: 'struct',
            },
        },
        {
            name: 'LockingInfo',
            type: {
                fields: [
                    {
                        name: 'amount',
                        type: 'u64',
                    },
                    {
                        name: 'endTimestamp',
                        type: {
                            option: 'u64',
                        },
                    },
                    {
                        name: 'vesting',
                        type: {
                            option: {
                                defined: 'VestingInfo',
                            },
                        },
                    },
                ],
                kind: 'struct',
            },
        },
        {
            name: 'DepositEntry',
            type: {
                fields: [
                    {
                        name: 'lockup',
                        type: {
                            defined: 'Lockup',
                        },
                    },
                    {
                        name: 'amountDepositedNative',
                        type: 'u64',
                    },
                    {
                        name: 'amountInitiallyLockedNative',
                        type: 'u64',
                    },
                    {
                        name: 'isUsed',
                        type: 'bool',
                    },
                    {
                        name: 'allowClawback',
                        type: 'bool',
                    },
                    {
                        name: 'votingMintConfigIdx',
                        type: 'u8',
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: ['u8', 29],
                        },
                    },
                ],
                kind: 'struct',
            },
        },
        {
            name: 'Lockup',
            type: {
                fields: [
                    {
                        name: 'startTs',
                        type: 'i64',
                    },
                    {
                        name: 'endTs',
                        type: 'i64',
                    },
                    {
                        name: 'kind',
                        type: {
                            defined: 'LockupKind',
                        },
                    },
                    {
                        name: 'reserved',
                        type: {
                            array: ['u8', 15],
                        },
                    },
                ],
                kind: 'struct',
            },
        },
        {
            name: 'VotingMintConfig',
            type: {
                fields: [
                    {
                        name: 'mint',
                        type: 'publicKey',
                    },
                    {
                        name: 'grantAuthority',
                        type: 'publicKey',
                    },
                    {
                        name: 'baselineVoteWeightScaledFactor',
                        type: 'u64',
                    },
                    {
                        name: 'maxExtraLockupVoteWeightScaledFactor',
                        type: 'u64',
                    },
                    {
                        name: 'lockupSaturationSecs',
                        type: 'u64',
                    },
                    {
                        name: 'digitShift',
                        type: 'i8',
                    },
                    {
                        name: 'reserved1',
                        type: {
                            array: ['u8', 7],
                        },
                    },
                    {
                        name: 'reserved2',
                        type: {
                            array: ['u64', 7],
                        },
                    },
                ],
                kind: 'struct',
            },
        },
        {
            name: 'LockupKind',
            type: {
                kind: 'enum',
                variants: [
                    {
                        name: 'None',
                    },
                    {
                        name: 'Daily',
                    },
                    {
                        name: 'Monthly',
                    },
                    {
                        name: 'Cliff',
                    },
                    {
                        name: 'Constant',
                    },
                ],
            },
        },
    ],
    version: '0.2.4',
};
