import axios from "axios";

export async function submitContact(payload) {
    const { data } = await axios.post("/api/contact", payload);
    return data;
}
