async function getRepositories() {
    const username = document.getElementById("usernameGet").value;
    const endpoint = new URL(`https://api.github.com/users/${username}/repos`)
    const response = await fetch(endpoint);
    if (response.ok) {
        const json = await response.json();
        const langarray = [];
        json.map((element) => {
            if (`${element.language}` !== 'null') {
                langarray.push(`${element.language}`);
            }
        });
        findMostFrequent(langarray);

        document.getElementById("ret").innerHTML = "Entered Github User's favourite programming language is :" + findMostFrequent(langarray);

        if (langarray.length === 0) {
            return alert('Couldnt determine users favourite language');
        }
    } else {
        return alert('Please enter a valid Github Username');
    }
}
    function findMostFrequent(arr) {
        let mf = 1;
        let m = 0;
        let item;
        for (let i = 0; i < arr.length; i++) {
            for (let j = i; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    m++;
                    if (m > mf) {
                        mf = m;
                        item = arr[i];
                    }
                }
            }
            m = 0;
        }
        return item;
    }
