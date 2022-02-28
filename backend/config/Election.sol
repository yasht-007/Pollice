// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Election{

    struct Candidate{
        uint id;
        address myAddress;
        string name;
        uint voteCount;
    }

    struct Voter{
        string voterName;
        bool voted;
    }

    Candidate[] private candidates; 

    uint public candidatesCount=0;
    uint public totalVoter=0;
    uint public totalVotes=0;

    address public ballotOfficialAddress;
    string public ballotOfficialName;
    string public proposal;

    mapping(address => Candidate) private candidateRegistry;
    mapping(address => Voter) private voterRegistry;
    mapping(uint => address) public candidateIdToAddress;

    enum State { Created, Voting, Ended }
    State public state;

    modifier onlyOfficial(){
        require(msg.sender == ballotOfficialAddress);
        _;
    }

    modifier inState(State _state){
        require(state == _state);
        _;
    }

     event electionVoteUpdate(
        string name
    );

    event electionState(
        string currentStateName
    );

     event voterRegister(
        string regStatus
    );

    constructor(
        string memory _ballotOfficialName,
        string memory _proposal,
        bytes32[] memory _candidateNames,
        address[] memory _cAddress
        )
    {
        ballotOfficialAddress = msg.sender;
        ballotOfficialName = _ballotOfficialName;
        proposal = _proposal;

         for (uint i = 0; i < _candidateNames.length; i++) {
             bytes32 foo = _candidateNames[i];
             string memory bar = string(abi.encodePacked(foo));

            addCandidate(_cAddress[i],bar);
        }

        state = State.Created;
        emit electionState("Created");
    }

    function addCandidate(address _candidateAddress, string memory _name) 
        private
        onlyOfficial
    {
        candidatesCount++;
        Candidate memory c;
        c.id=candidatesCount;
        c.myAddress=_candidateAddress;
        c.name=_name;
        c.voteCount=0;
        candidateRegistry[_candidateAddress] = c;
        candidateIdToAddress[candidatesCount] = _candidateAddress;

         candidates.push(Candidate({
                id:candidatesCount,
                myAddress:_candidateAddress,
                name: _name,
                voteCount: 0
            }));
    }

    function addVoter(address _voterAddress,string memory _voterName)
        public 
        inState(State.Created)
        onlyOfficial
    {
        Voter memory v;
        v.voterName = _voterName;
        v.voted = false;

        voterRegistry[_voterAddress] = v;
        totalVoter++;

        emit voterRegister("Voter Registered");
    }

    function startVote()
        public
        inState(State.Created)
        onlyOfficial
    {
        state= State.Voting;
        emit electionState("Voting");
    }


    function doVote(uint _candidateId,string memory _candidateName) 
        public
        inState(State.Voting)
    {

        address candidateAddress;
        candidateAddress= candidateIdToAddress[_candidateId];

        require(candidateRegistry[candidateAddress].id !=0 ,"This candidate doesn't exist");
        require(!voterRegistry[msg.sender].voted,"You have already voted for the participant");

        if(bytes(voterRegistry[msg.sender].voterName).length != 0){
            candidateRegistry[candidateAddress].voteCount++;
            voterRegistry[msg.sender].voted = true;
            totalVotes++;
        }

        emit electionVoteUpdate(_candidateName);
    }

    function endVote()
        public
        inState(State.Voting)
        onlyOfficial
    {
        state= State.Ended;
        emit electionState("Ended");
    }

    function winnerIndex()
        private view
        inState(State.Ended)
        returns (uint winningProposal)
    {
        uint winningVoteCount = 0;
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winningProposal = i ;
            }
        }
    }

    function winnerName()
        public
        view
        inState(State.Ended)
        returns (string memory winnerName_)
    {
        winnerName_ = candidates[winnerIndex()].name;
    }

    function winnerAddress()
        public
        view
        inState(State.Ended)
        returns (address winnerAddress_)
    {
        winnerAddress_= candidates[winnerIndex()].myAddress;
    }

    function winnerId()
        public
        view
        inState(State.Ended)
        returns (uint winnerId_)
    {
        winnerId_= candidates[winnerIndex()].id;
    }

    function myVoteStatus()
        public
        view
        returns (bool status)
    {
        status = voterRegistry[msg.sender].voted;
    }
}
