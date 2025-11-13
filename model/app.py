import gradio as gr

def identify_waste(image):
    # Dummy example — replace with your actual ML model
    return "Plastic bottle"

demo = gr.Interface(fn=identify_waste, inputs="image", outputs="text")
demo.launch(server_name="127.0.0.1", server_port=7860)
