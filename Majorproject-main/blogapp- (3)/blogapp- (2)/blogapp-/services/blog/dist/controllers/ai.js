import { VertexAI } from "@google-cloud/vertexai";
const vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: "us-central1",
});
export const fixBlogGrammar = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text)
            return res.status(400).json({ message: "Text required" });
        const model = vertexAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: `Fix grammar only:\n${text}` }],
                },
            ],
        });
        const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!responseText) {
            console.error("Empty Gemini response:", JSON.stringify(result.response));
            return res.status(500).json({
                message: "Gemini returned empty response",
            });
        }
        res.json({ result: responseText });
    }
    catch (error) {
        console.error("Gemini error:", error);
        res.status(500).json({ message: "Grammar fix failed" });
    }
};
//# sourceMappingURL=ai.js.map