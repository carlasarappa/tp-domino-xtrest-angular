package ar.edu.unq.uis.domino.data

import ar.edu.unq.uis.domino.repo.Repositories

import ar.edu.unq.uis.domino.model.IngredienteDistribuido
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class IngredienteDistribuidoRequest {
	Integer ingrediente
	String distribucion
	String nombre
	
	new(){	}
	new(IngredienteDistribuido ingredienteDistribuido){
		this.ingrediente = ingredienteDistribuido.ingrediente.id
		this.nombre = ingredienteDistribuido.ingrediente.nombre
		this.distribucion = ingredienteDistribuido.distribucion.nombre
	}
	
	def getIngredienteDistribuido(){
		new IngredienteDistribuido(
			Repositories.ingredientes.searchById(ingrediente), 
			Repositories.distribuciones.searchByNombre(distribucion)
		)
	}
	
}