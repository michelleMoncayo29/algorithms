const { Candidate, VotingSystem } = require('./exercise');

describe('Sistema de Votación Simple', () => {
    describe('Candidate', () => {
        test('debe crear candidato con nombre y partido', () => {
            const candidate = new Candidate("Alice", "Party A");
            expect(candidate.name).toBe("Alice");
            expect(candidate.party).toBe("Party A");
        });

        test('debe crear candidato sin partido', () => {
            const candidate = new Candidate("Bob");
            expect(candidate.name).toBe("Bob");
            expect(candidate.party).toBe("");
        });

        test('toString debe retornar formato correcto con partido', () => {
            const candidate = new Candidate("Alice", "Party A");
            expect(candidate.toString()).toBe("Alice (Party A)");
        });

        test('toString debe retornar solo nombre sin partido', () => {
            const candidate = new Candidate("Bob");
            expect(candidate.toString()).toBe("Bob");
        });

        test('debe lanzar error cuando nombre está vacío', () => {
            expect(() => new Candidate("")).toThrow();
        });
    });

    describe('VotingSystem', () => {
        test('debe agregar candidatos correctamente', () => {
            const system = new VotingSystem();
            const candidate1 = new Candidate("Alice");
            const candidate2 = new Candidate("Bob");
            
            expect(system.addCandidate(candidate1)).toBe(1);
            expect(system.addCandidate(candidate2)).toBe(2);
        });

        test('debe registrar votos correctamente', () => {
            const system = new VotingSystem();
            system.addCandidate(new Candidate("Alice"));
            
            expect(system.vote("Alice", "voter1")).toBe(true);
            expect(system.getVoteCount("Alice")).toBe(1);
        });

        test('debe prevenir votos duplicados del mismo votante', () => {
            const system = new VotingSystem();
            system.addCandidate(new Candidate("Alice"));
            
            expect(system.vote("Alice", "voter1")).toBe(true);
            expect(system.vote("Alice", "voter1")).toBe(false);
        });

        test('debe buscar candidatos case-insensitive', () => {
            const system = new VotingSystem();
            system.addCandidate(new Candidate("Alice"));
            
            expect(system.vote("alice", "voter1")).toBe(true);
            expect(system.vote("ALICE", "voter2")).toBe(true);
            expect(system.getVoteCount("alice")).toBe(2);
        });

        test('getResults debe retornar resultados ordenados por votos', () => {
            const system = new VotingSystem();
            system.addCandidate(new Candidate("Alice"));
            system.addCandidate(new Candidate("Bob"));
            
            system.vote("Alice", "voter1");
            system.vote("Alice", "voter2");
            system.vote("Bob", "voter3");
            
            const results = system.getResults();
            expect(results[0].name).toBe("Alice");
            expect(results[0].votes).toBe(2);
            expect(results[1].name).toBe("Bob");
            expect(results[1].votes).toBe(1);
        });

        test('getWinner debe retornar candidato con más votos', () => {
            const system = new VotingSystem();
            system.addCandidate(new Candidate("Alice"));
            system.addCandidate(new Candidate("Bob"));
            
            system.vote("Alice", "voter1");
            system.vote("Alice", "voter2");
            system.vote("Bob", "voter3");
            
            expect(system.getWinner()).toEqual(["Alice"]);
        });

        test('getWinner debe retornar múltiples ganadores en caso de empate', () => {
            const system = new VotingSystem();
            system.addCandidate(new Candidate("Alice"));
            system.addCandidate(new Candidate("Bob"));
            
            system.vote("Alice", "voter1");
            system.vote("Bob", "voter2");
            
            const winners = system.getWinner();
            expect(winners).toContain("Alice");
            expect(winners).toContain("Bob");
        });

        test('getTotalVotes debe retornar total correcto', () => {
            const system = new VotingSystem();
            system.addCandidate(new Candidate("Alice"));
            system.addCandidate(new Candidate("Bob"));
            
            system.vote("Alice", "voter1");
            system.vote("Alice", "voter2");
            system.vote("Bob", "voter3");
            
            expect(system.getTotalVotes()).toBe(3);
        });

        test('debe lanzar error al agregar candidato no válido', () => {
            const system = new VotingSystem();
            expect(() => system.addCandidate({})).toThrow();
        });

        test('debe lanzar error al agregar candidato duplicado', () => {
            const system = new VotingSystem();
            system.addCandidate(new Candidate("Alice"));
            expect(() => system.addCandidate(new Candidate("alice"))).toThrow();
        });
    });
});

