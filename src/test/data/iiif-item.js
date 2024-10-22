const test_metadata = {
    "title": "Test Title",
    "uri": "{handle}",
    "identifiers": [
        {
            "type": "local",
            "identifier": "M123.45.00006"
        }
    ],
    "resource_type": "sound recording nonmusical",
    "dates": [
        {
            "encoding": "w3cdtf",
            "label": "creation",
            "type": "single",
            "expression": "1999 August 5",
            "begin": "1999-08-05"
        },
        {
            "encoding": "w3cdtf",
            "label": "creation",
            "type": "single",
            "expression": "2003",
            "begin": "2003"
        }
    ]
}

export const test_data = {
    "A": {
        args: {
            metadata: test_metadata
        },
        item: {}
    }
}
