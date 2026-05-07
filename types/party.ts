export type PartyMember = {
    userId: string;
    characterId: string;
    joinedAt: string;
};

export type Party = {
    _id: string;
    name: string;
    description?: string;
    dmUserId: string;
    maxMembers: number;
    members: PartyMember[];
    createdAt: string;
};

export type PartyInvite = {
    _id: string;
    partyId: string;
    partyName: string;
    invitedEmail: string;
    invitedBy: string;
    status: 'pending' | 'accepted' | 'declined';
    createdAt: string;
};
